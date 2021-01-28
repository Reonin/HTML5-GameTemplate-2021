import Enemy from './Enemy.js';
import Pickup from './pickup.js';
import { handleCollisions } from './collision/handleCollisions.js';
import { startTimer } from './utils/timer.js';

export default function update() { // Updates location and reaction of objects to the canvas
  if (window.currentState === window.states.splash) {
    // splashTextX += 1;
    splashTextY += 1;

    if (splashTextY >= 300) {
      window.currentState = window.states.title;
    }
  }

  if (window.currentState === window.states.title) {
    if (keydown.space) {
      window.currentState = window.states.Game;
      startTimer();
    }
  }

  if (window.currentState === window.states.Game) {
    // Player Movement Controls
    window.playerArray.forEach((p) => {
      p.movement();
    });

    // window.player actions
    // if (keydown.space) {
    //   window.player.shoot();
    // }

    window.playerBullets.forEach((bullet) => {
      bullet.update();
    });

    window.playerBullets = window.playerBullets.filter((bullet) => bullet.active);

    if (keydown.v) {
      window.player.launch();
    }

    playerMissiles.forEach((Missile) => {
      Missile.update();
    });

    playerMissiles = playerMissiles.filter((Missile) => Missile.active);

    // // Enemy Update logic
    // window.enemies.forEach((enemy) => {
    //   enemy.update();
    // });
    // // Garbage collect the enemies out of the array
    // window.enemies = window.enemies.filter((enemy) => enemy.active);
    // if (Math.random() < 0.05) {
    //   window.enemies.push(new Enemy());
    // }

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
  }

  if (window.currentState === window.states.End) {
    endTextY += 1;

    if (endTextY >= 300) {
      endTextY = 300;
    }
  }
}
