const Gitter = require('node-gitter');
const StatusJS = require('status-js-api');
const config = require('./config');
 
const gitter = new Gitter(config.gitter.token);
const status = new StatusJS();

(async () => {
  await status.connect(config.status.provider, config.status.privateKey);
  const pk = await status.getPublicKey();
  const user = await gitter.currentUser();

  console.log("Gitter⇄Status Bridge");
  console.log("===============================");
  console.log('Status contact code: ' + pk);
  console.log('Status channel: ', config.status.room);
  console.log('Gitter user:', user.username);
  console.log('Gitter room: ', config.gitter.room);

  const room = await gitter.rooms.join(config.gitter.room);
  const events = room.streaming().chatMessages();

  await status.joinChat(config.status.room);

  // Message received from Status. Send to gitter
  status.onChannelMessage(config.status.room, async (err, {payload, data, username}) => {
    if(err){
      console.error(err); 
      return;
    }
    
    const message = JSON.parse(payload);

    if(message[0] !== "~#c4") return; // Not a message. Ignore
    if(data.sig === pk) return; // Bridge user. Ignore

    let gitterMsg = `**${username.replace(/\s/g, '-')}@status.im** ${message[1][0]}`;
    if(config.gitter.replace){
      gitterMsg = gitterMsg.replace(config.gitter.replace, '');
    }

    await room.send(gitterMsg);
  });

  // Message received from Gitter. Send to Status
  events.on('chatMessages', message => {
    if(message.operation !== 'create') return; // Not a new message. Ignore
    if(message.model.fromUser.username === user.username) return; // Bridge user. Ignore
    
    let statusMsg = `*${message.model.fromUser.username}@gitter* ${message.model.text}`;
    if(config.status.replace){
      statusMsg = statusMsg.replace(config.status.replace, '');
    }

    status.sendGroupMessage(config.status.room, statusMsg, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
})();