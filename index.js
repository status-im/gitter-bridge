const Gitter = require('node-gitter');
const StatusJS = require('status-js-api');
const config = require('./config');
 
const gitter = new Gitter(config.token);
const status = new StatusJS();

(async () => {
  await status.connect(config.statusProvider, config.statusPrivateKey);
  const pk = await status.getPublicKey();
  const user = await gitter.currentUser();

  console.log("Gitter ⇄ Status Bridge");
  console.log("===============================");
  console.log('Status contact code: ' + pk);
  console.log('Gitter user:', user.username);

  const room = await gitter.rooms.join(config.gitterRoom);
  const events = room.streaming().chatMessages();

  await status.joinChat(config.statusRoom);

  // Message received from Status. Send to gitter
  status.onChannelMessage(config.statusRoom, async (err, {payload, data, username}) => {
    if(err){
      console.error(err); 
      return;
    }
    
    const message = JSON.parse(payload);

    if(message[0] !== "~#c4") return; // Not a message. Ignore
    if(data.sig === pk) return; // Bridge user. Ignore

    const gitterMsg = `${username.replace(/\s/g, '-')}@status.im: ${message[1][0]}`;
    await room.send(gitterMsg);
  });

  // Message received from Gitter. Send to Status
  events.on('chatMessages', message => {
    if(message.operation !== 'create') return; // Not a new message. Ignore
    if(message.model.fromUser.username === user.username) return; // Bridge user. Ignore

    const statusMsg = `${message.model.fromUser.username}@gitter: ${message.model.text}`;
    status.sendGroupMessage(config.statusRoom, statusMsg, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
})();