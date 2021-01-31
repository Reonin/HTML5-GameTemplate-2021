import Enemy from './Enemy.js';
import Pickup from './pickup.js';
import handleCollisions from './collision/handleCollisions.js';
import { startTimer } from './utils/timer.js';
import { trackScore, tallyPointTotal } from './utils/scoreKeeper.js';
import sendData from '../ws.js';
import Player from './player.js';
import { globalPickupRefresher } from './gameMechanic.js';

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
      // console.log('Lobby');

      if (window.localPlayerSet == false) {
        // var startData = {
        //   type : "gameStart"
        // }
        // sendData(startData);
        window.localPlayerSet = true;
        await window.playerArray[0].setStartData().then((player) => {
          console.log(`Promise returned: ${player}`);
          // sleep(5000)
          const playerObj = JSON.parse(player);
          window.playerArray[0].x = playerObj.x;
          window.playerArray[0].y = playerObj.y;
          console.log(`Player x is now ${window.playerArray[0].x}`);
        }).then(
          window.playerArray[0].setFirstOpponentStartData().then((player) => {
            console.log(`Promise returned: ${player}`);
            // sleep(5000)
            const playerObj = JSON.parse(player);
            window.playerArray[1].x = playerObj.x;
            window.playerArray[1].y = playerObj.y;
            console.log(`Player x is now ${window.playerArray[1].x}`);
          }),
        ).then(
          window.playerArray[0].setSecondOpponentData().then((player) => {
            console.log(`Promise returned: ${player}`);
            // sleep(5000)
            const playerObj = JSON.parse(player);
            window.playerArray[2].x = playerObj.x;
            window.playerArray[2].y = playerObj.y;
            console.log(`Player x is now ${window.playerArray[2].x}`);
          }),
        )
          .catch((err) => {
            console.log('Error in lobby start Finding yourself');
          });
      }

      if (window.localPlayerSet == true) {
        window.socket.onmessage = function (message) {
          console.log(`Message in localplayerset: ${JSON.stringify(message.data)}`);
          const playerObj = JSON.parse(message.data);
          console.log(`All players set true: ${playerObj.startGame}`);
          window.allPlayersSet = true;
        };
      }
      /** *
       * fast pass to game
       *
       *
       * */
      // window.currentState = window.states.GAME;
      // trackScore();
      /** * */

      if (window.allPlayersSet == true) {
        const msg = {
          type: 'getStartData',
        };
        sendData(msg);
        window.socket.onmessage = function (message) {
          const playerObj = JSON.parse(message.data);
          window.playerArray.forEach((p) => {
            playerObj.forEach((wsPlayer) => {
              if (wsPlayer.playerName == 'Player 1') {
                p.updateStartingXY(wsPlayer.x, wsPlayer.y);
                console.log(`Player 1 start x is ${p.startingX}`);
              } else if (wsPlayer.playerName == 'Player 2') {
                p.updateStartingXY(wsPlayer.x, wsPlayer.y);
                console.log(`Player 2 start x is ${p.startingX}`);
              } else if (wsPlayer.playerName == 'Player 3') {
                p.updateStartingXY(wsPlayer.x, wsPlayer.y);
                console.log(`Player 3 start x is ${p.startingX}`);
              }
            });
          });
          window.currentState = window.states.GAME;
          globalPickupRefresher();
        };
      }
      break;

    case window.states.GAME:
      // Player Movement Controls
      window.playerArray.forEach((p) => {
        p.movement();

        // AI
        try {
          // p.checkAI();
        } catch (e) {}
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
      // window.endTextY += 1;

      // if (window.endTextY >= 300) {
      //   window.endTextY = 300;
      // }
      break;
  }
}
function sleep(miliseconds) {
  const currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {
  }
}
