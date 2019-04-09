# gitter-bridge
Gitter &lt;-> Status Bridge

### Requirements
1. node.js
2. go-ethereum / status-go / murmur

### Configuration 
1. Edit `config.js` with the details on which channels to bridge, tokens and private key. You can obtain a gitter token in https://developer.gitter.im/apps
2. A whisper node is required to be running in parallel. You could execute geth in a separate terminal session `geth` following these instructions: https://github.com/status-im/status-js-api#using-geth, or install `status-go` or `murmur`

### Usage
1. `npm start` or `yarn start` to start the bridge. 

A tool like `nodemon` could be used to automatically restart the bridge in case an error happens.
