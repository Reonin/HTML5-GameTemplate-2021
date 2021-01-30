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
        await window.player.setStartData().then(response =>{
       
          //sleep(5000)
          console.log(`Player x is now ${window.player.x}`)});
          
        
      }
      
      
      if (keydown.space && window.allPlayersReady()) {
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
