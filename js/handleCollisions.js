import { collides } from './collisionBox.js';

export function handleCollisions() {
    window.playerBullets.forEach((bullet) => {
      window.enemies.forEach((enemy) => {
        if (collides(bullet, enemy)) {
          enemy.explode();
          bullet.active = false;
        }
      });
    });
  
    window.playerMissiles.forEach((Missile) => {
      window.enemies.forEach((enemy) => {
        if (collides(Missile, enemy)) {
          enemy.explode();
          Missile.active = false;
        }
      });
    });
  
    window.enemies.forEach((enemy) => {
      if (collides(enemy, player)) {
        enemy.explode();
        player.lifeChange(-10);
      }
    });
  }