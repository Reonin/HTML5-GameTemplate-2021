import Enemy from './Enemy.js';
import Pickup from './pickup.js';
import handleCollisions from './collision/handleCollisions.js';
import { startTimer } from './utils/timer.js';
import {trackScore, tallyPointTotal} from './utils/scoreKeeper.js';
import sendData from '../ws.js';
import Player from './player.js';



export default async function update() { // Updates location and reaction of objects to the canvas

  switch (window.currentState) {
    case window.states.SPLASH:
      // splashTextX += 1;
      splashTextY += 1;

      if (splashTextY >= 300) {
        window.currentState = window.states.TITLE;
      }
      break;
    case window.states.TITLE:
      if (keydown.space) {
        window.currentState = window.states.LOBBY;
        
        startTimer();
        trackScore();
        tallyPointTotal();
      }
      break;

    case window.states.LOBBY:
      //console.log('Lobby');
      
      if(window.localPlayerSet == false){
        // var startData = {
        //   type : "gameStart"
        // }
        // sendData(startData);
        window.localPlayerSet = true;
        await window.player.setStartData().then(player =>{
          console.log(`Promise returned: ${player}`);
          //sleep(5000)
          var playerObj = JSON.parse(player);
          window.player.x = playerObj.x;
          window.player.y = playerObj.y;
          console.log(`Player x is now ${window.player.x}`)}).catch(err =>{
            console.log(`Error in lobby start`);
          });
          
        
      }

      if(window.localPlayerSet == true){
        window.socket.onmessage = function (message) {
          console.log(`Message in localplayerset: ${JSON.stringify(message.data)}`);
          var playerObj = JSON.parse(message.data);
          console.log(`All players set true: ${playerObj.startGame}`);
          window.allPlayersSet = true;
      }
    }
      //fast pass to game
      //window.currentState = window.states.GAME;
      if (window.allPlayersSet == true) {
       window.currentState = window.states.GAME;
       }
      break;

    case window.states.GAME:
      // Player Movement Controls
      window.playerArray.forEach((p) => {
        p.movement();

        //AI
        try{
          //p.checkAI();
        }
        catch(e){}
      });

      window.camera.update();

      // Powerup Update logic
      window.pickups.forEach((pickup) => {
        pickup.update();
      });

      window.pickups = window.pickups.filter((pickup) => pickup.active);

      if (Math.random() < 0.0001) {
        window.pickups.push(new Pickup());
      }
      
      // Handle Collision
      handleCollisions();
      break;

    case window.states.END:
      window.endTextY += 1;

      if (window.endTextY >= 300) {
        window.endTextY = 300;
      }
      break;
  }
}
function sleep(miliseconds) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}
