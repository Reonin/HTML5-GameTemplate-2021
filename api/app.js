const express = require('express');
const ws = require('ws');
const db = require("./models");
const app = express();
//const Player = db.player;
const Player = require('./controller/players.controller.js');
const Game = require('./controller/game.controller.js');
var webSockets = {}

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
//   });

//   function initial() {
//     Player.create({
//         player: "player1",
//         x: 0,
//         y: 0
//     })
//     Player.create({
//         player: "player2",
//         x: 0,
//         y: 0
//     })
//     Player.create({
//         player: "player3",
//         x: 0,
//         y: 0
//     })
//     Player.create({
//         player: "player4",
//         x: 0,
//         y: 0
//     })
//   }



// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', message => {//
    messageObj = JSON.parse(message)
    console.log(`WebSocket message received ${message} and ${messageObj.type}`);
    if(message.type == "playerMovement"){
      Player.updatePlayers(message);
      socket.send(Player.getPlayersObjects());
    }
    else if(messageObj.type == "gameStart"){
      console.log('Start game')
      playerObj = Game.startGame()
      socket.send(JSON.stringify(playerObj));
      console.log(`Message sent gamestart: ${JSON.stringify(playerObj)}`)
    }
  }
)});


// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
    
  });
  
});