module.exports = {
  'gitter': {
    'token': process.env.GITTER_TOKEN,
    "room": "status-im/gitter-bridge",
  },
  'status': {
    "provider": "ws://localhost:8546",
    "privateKey": process.env.STATUS_PRIVKEY,
    "room": "#gitter-bridge",
    "replace": /^\*\*embarkbot_gitlab@gitter\*\*/
  }
}
