var players = [{
    playerName : "Player 1",
    x: 967,
    y: 516,
    isSet : false,
    isIt : true
},{
    playerName : "Player 2",
    x: 877,
    y: 445,
    isSet : false,
    isIt : false
},{
    playerName : "Player 3",
    x: 1098,
    y: 445,
    isSet : false,
    isIt : false
},]

var startGame = false;
var whoIsIt = 'Player 1';

exports.setPlayers = () => {
    for(var i = 0; i < players.length; i++){
        var playerObj = players[i];
        console.log(`Player obj is ${playerObj.isSet}`);
        if(playerObj.isSet == false){
            playerObj.isSet = true;
            console.log(`Player is : ${JSON.stringify(playerObj)}`)
            return playerObj;
        }
        
    }
}

exports.startGame = () => {
    for(var i = 0; i < players.length; i++){
        var playerObj = players[i];
        console.log(`Player obj is ${playerObj.isSet}`);
        if(playerObj.playerName == 'Player 3' && playerObj.isSet == true){
            startGame = true;
            return startGame;
        }
        
    }
}


exports.getPlayerData = () => {
    return players;
}