var Players = new Map([]); 

exports.updatePlayers = (playerData) => {
        console.log(JSON.stringify(playerData));
            player = JSON.parse(playerData);
            //console.log(`Player name: ${player.playerName}\nPlayer x: ${player.x}\nPlayer y: ${player.y}`)
            if(player.playerName == 'Player 1'){
                Players.set('Player 1', {x:player.x,y:player.y});
            }
            else if(player.playerName == 'Player 2'){
                Players.set('Player 2', {x:player.x,y:player.y});
            }
            else if(player.playerName == 'Player 3'){
                Players.set('Player 3', {x:player.x,y:player.y});
            }
            else{
                Players.set('Player 4', {x:player.x,y:player.y});
            }
        console.log(Players.get('Player 1'))
        return Players;
    };

exports.getPlayersObjects = () => {
        const players = Object.fromEntries(Players);
        //console.log(`Player1: ${players}`);
        console.log(`Players JSON: ${JSON.stringify(players)}`);
        return JSON.stringify(players);
    }