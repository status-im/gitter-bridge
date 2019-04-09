module.exports = {
  'gitter': {
    'token': process.env.GITTER_TOKEN,
    "room": "embark-framework/embark-dev",
  },
  'status': {
    "provider": "ws://localhost:8546",
    "privateKey": process.env.STATUS_PRIVKEY,
    "room": "#status-embark",
    "replace": /^embarkbot_gitlab@gitter/
  }
}
