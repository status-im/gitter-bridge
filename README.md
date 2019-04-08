# gitter-bridge
Gitter &lt;-> Status Bridge

### Requirements
1. node.js
2. go-ethereum

### Configuration 
1. Edit `config.js` with the details on which channels to bridge, tokens and private key. You can obtain a gitter token in https://developer.gitter.im/apps
2. Execute geth in a separate terminal session `geth` following these instructions: https://github.com/status-im/status-js-api#using-geth

### Usage
1. `npm start` or `yarn start` to start the bridge. 

A tool like `nodemon` could be used to automatically restart the bridge in case an error happens.

### Pending tasks
Include `murmur` to avoid having to install geth.
