import Enemy from './Enemy.js';
import Pickup from './pickup.js';
import handleCollisions from './collision/handleCollisions.js';
import { startTimer } from './utils/timer.js';

export default function update() { // Updates location and reaction of objects to the canvas


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
        window.currentState = window.states.GAME;
        startTimer();
      }
      break;

    case window.states.LOBBY:
      
      break;

    case window.states.GAME:

      // Player Movement Controls
      window.playerArray.forEach((p) => {
        p.movement();
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
      endTextY += 1;

      if (endTextY >= 300) {
        endTextY = 300;
      }
      break;
  }
}
