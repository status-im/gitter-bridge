#!/usr/bin/env sh

export GITTER_TOKEN=
export STATUS_PRIVKEY=

killall geth

geth --testnet --ws --wsport=8546 --wsaddr=localhost --wsorigins=* --shh --wsapi=web3,net,shh --syncmode=light &

npm start
