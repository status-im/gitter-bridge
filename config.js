module.exports = {
  'gitter': {
    'token': process.env.GITTER_TOKEN,
    "room": "status-im/gitter-bridge",
  },
  'status': {
    "provider": "ws://localhost:8546",
    "privateKey": process.env.STATUS_PRIVKEY,
    "room": "#gitter-bridge",
    "replace": (username, msg) => { 
      if(username !== "embarkbot_gitlab") return msg;
      return msg.replace(/^\*embarkbot_gitlab@gitter\* (.+?@discord) (.*)$/, "*$1* $2") 
    }
  }
}
