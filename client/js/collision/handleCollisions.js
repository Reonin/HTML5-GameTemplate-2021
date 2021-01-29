import { collides } from './collisionBox.js';

export default function handleCollisions() {
  // window.playerBullets.forEach((bullet) => {
  //   window.enemies.forEach((enemy) => {
  //     if (collides(bullet, enemy)) {
  //       enemy.explode();
  //       bullet.active = false;
  //     }
  //   });
  // });

  // window.playerMissiles.forEach((Missile) => {
  //   window.enemies.forEach((enemy) => {
  //     if (collides(Missile, enemy)) {
  //       enemy.explode();
  //       Missile.active = false;
  //     }
  //   });
  // });

  // window.enemies.forEach((enemy) => {
  //   if (collides(enemy, player)) {
  //     enemy.explode();
  //     player.lifeChange(-10);
  //   }
  // });
  window.playerArray.forEach((player) => {
    // if (collides(player, player)) {
    //   console.log("TEST");
    // }
  })


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
            
             //window.bufferHoriz = 0;
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
    }
        else if(tile.type == 'pickup'){

          window.playerArray.forEach((player) => {
            if (collides(tile, player)) {
              tile.active = false;
             //hides pickups from the render
            };
          
          })
        }

  });
}
