import { collides } from './collisionBox.js';
import { transferTag, colorWheelRoulette } from '../gameMechanic.js';

export default function handleCollisions() {
  if (collides(playerArray[0], playerArray[1])) {
    transferTag(playerArray[0], playerArray[1]);
   
  }

  if (collides(playerArray[0], playerArray[2])) {
    //console.log('P1 touches P3');
    transferTag(playerArray[0], playerArray[2]);
  }

  if (collides(playerArray[1], playerArray[2])) {
    //console.log('P2 touches P3');
    transferTag(playerArray[1], playerArray[2]);
  }

  // Pickups Collision
  pickups.forEach((pickup) => {
    if (collides(pickup, player)) {
      pickup.explode();
      player.lifeChange(30);
    }
  });

  // tile
  tileArray.forEach((tile) => {
    if (tile.type == 'wall') {
      window.playerArray.forEach((player) => {
        if (collides(tile, player)) {
          // console.log(tile);
          if (player.velX < 0) {
            // window.bufferHoriz = 0;
            if (player.x > tile.x) {
              // console.log("left stop");
              player.x += player.speed;
              player.velX = 0;
            }
          }

          if (player.velX > 0) {
            // window.bufferHoriz = 0;
            if (player.x < tile.x) {
              // console.log("right stop");
              player.x -= player.speed;
              player.velX = 0;
            }
          }

          if (player.velY < 0) {
            if (player.y > tile.y) {
              // console.log("up stop");
              player.y += player.speed;
              player.velY = 0;
            }
          }

          if (player.velY > 0) {
            if (player.y < tile.y) {
              // console.log("down stop");
              player.y -= player.speed;
              player.velY = 0;
            }
          }
        }
      });
    } else if (tile.type == 'pickup') {
      window.playerArray.forEach((player) => {
        if (collides(tile, player)) {
         if(tile.active){
          // hides pickups from the render
          tile.active = false;
          colorWheelRoulette(player);
         
         }
         
        }
      });
    }
  });
}
