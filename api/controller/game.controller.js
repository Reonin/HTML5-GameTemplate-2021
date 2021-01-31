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

module.exports = {
    setPlayers: function(){
        for(var i = 0; i < players.length; i++){
            var playerObj = players[i];
            console.log(`Player obj is ${playerObj.isSet}`);
            if(playerObj.isSet == false){
                playerObj.isSet = true;
                console.log(`Player is : ${JSON.stringify(playerObj)}`)
                return playerObj;
            }
            
        }
    },

    startGame: function(){
        for(var i = 0; i < players.length; i++){
            var playerObj = players[i];
            console.log(`Player obj is ${playerObj.isSet}`);
            if(playerObj.playerName == 'Player 3' && playerObj.isSet == true){
                startGame = true;
                return startGame;
            }
            
        }
    },

    getPlayerData: function(){
        return players;
    },

    setPlayerData: function(playerData){
        for(var i = 0; i < players.length; i++){
            var playerObj = players[i];
            //console.log(`PlayerData is ${JSON.stringify(playerData)}`);
            if(playerData.playerName == "Player 1" && playerObj.playerName == "Player 1"){
                playerObj.x = playerData.x;
                playerObj.y = playerData.y;
                playerObj.isIt = playerData.isIt;
            }
            else if(playerData.playerName == "Player 2" && playerObj.playerName == "Player 2"){
                playerObj.x = playerData.x;
                playerObj.y = playerData.y;
                playerObj.isIt = playerData.isIt;
            }
            else if(playerData.playerName == "Player 3" && playerObj.playerName == "Player 3"){
                playerObj.x = playerData.x;
                playerObj.y = playerData.y;
                playerObj.isIt = playerData.isIt;
            }

        }
    },

    getFirstOpponent: function(data){
        for(var i = 0; i <players.length; i++){
            var player = players[i]
            if(data.whoAmI == 'Player 1' && player.playerName == 'Player 2'){
                return player;
            }else if(data.whoAmI == 'Player 2' && player.playerName == 'Player 1'){
                return player;
            }else if(data.whoAmI == 'Player 3' && player.playerName == 'Player 1'){
                return player;
            }
        }
    },

    getSecondOpponent: function(data){
        for(var i = 0; i <players.length; i++){
            var player = players[i]
            if(data.whoAmI == 'Player 1' && player.playerName == 'Player 3'){
                return player;
            }else if(data.whoAmI == 'Player 2' && player.playerName == 'Player 3'){
                return player;
            }else if(data.whoAmI == 'Player 3' && player.playerName == 'Player 2'){
                return player;
            }
        }
    }
};

