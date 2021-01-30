const express = require('express');
const ws = require('ws');
const db = require("./models");
const app = express();
//const Player = db.player;
const Player = require('./controller/players.controller.js');
const Game = require('./controller/game.controller.js');
var webSockets = {}
var clients = [];

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  // var connection = socket.accept('any-protocol', socket.origin);
  // clients.push(connection);
  socket.on('message', message => {//socker is responding to the message it receives, so only will reply to that specific message. If we want to reply to all message listeners on client it must be done outside this message listener using socket.send
    messageObj = JSON.parse(message)
    console.log(`WebSocket message received ${message} and ${messageObj.type}`);
    if(message.type == "playerMovement"){
      Player.updatePlayers(message);
    }
    else if(messageObj.type == "gameStart"){
      console.log('Start game');
      playerObj = Game.setPlayers();
      playerObj.startGame = Game.startGame();
      if(playerObj.startGame == true){
        wsServer.clients.forEach(client => {
          client.send(JSON.stringify(playerObj));
      });
      }
      socket.send(JSON.stringify(playerObj));
      console.log(`Message sent gamestart: ${JSON.stringify(playerObj)}`)
    }
  }
)});

wsServer.clients.forEach(client => {
  socket.send(Player.getPlayersObjects());
});

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
    
  });
  
});