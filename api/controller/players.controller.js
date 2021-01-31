//var Players = new Map();
const gameController = require('./game.controller.js');
var players = gameController.getPlayerData();

exports.updatePlayers = (playerData) => {
        //console.log(JSON.stringify(playerData));
            player = JSON.parse(playerData);
            for(var i = 0; i < players.length; i++){
            var playerObj = players[i]
            //console.log(`Player name: ${player.playerName}\nPlayer x: ${player.x}\nPlayer y: ${player.y}`)
            if(playerObj.playerName == 'Player 1'){
                // Players.set('Player 1', {playerName: 'Player 1', x:player.x,y:player.y});
                playerObj.x = player.x;
                playerObj.y = player.y;
                playerObj.isIt = player.isIt;
                gameController.setPlayerData(playerObj);
            }
            else if(playerObj.playerName == 'Player 2'){
                playerObj.x = player.x;
                playerObj.y = player.y;
                playerObj.isIt = player.isIt;
                gameController.setPlayerData(playerObj);
            }
            else if(playerObj.playerName == 'Player 3'){
                playerObj.x = player.x;
                playerObj.y = player.y;
                playerObj.isIt = player.isIt;
                gameController.setPlayerData(playerObj);
            }
        }

       
        // console.log(Players.get('Player 1'))
        //return players;
        
    };

// exports.getPlayersObjects = () => {
//         const players = Object.fromEntries(Players);
//         //console.log(`Player1: ${players}`);
//        // console.log(`Players JSON: ${JSON.stringify(players)}`);
//         return JSON.stringify(players);
//     }