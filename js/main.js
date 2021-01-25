import scaletosmallest from './scaletosmallest.js';
import Bullet from './Bullet.js';
import Missile from './Missile.js';
import { Enemy } from './Enemy.js';
import { handleCollisions } from './handleCollisions.js';
import { setUpKeys } from './setUpKeys.js';
import { mapArray } from './mapArray.js';
// import { collisionDetection } from './collisionDetection.js';

scaletosmallest(canvasid, ratio);
$(window).on('resize', () => {
  scaletosmallest(canvasid, ratio);
});

// Draw tile map
drawMap(canvas);
// Game State

window.states = {
  splash: 0,
  title: 1,
  Game: 2,
  End: 3,
};
window.currentState = window.states.title;

// Game Loop
// var FPS = 60;

// shim layer with setTimeout fallback
window.requestAnimFrame = (() => window.requestAnimationFrame
           || window.webkitRequestAnimationFrame
           || window.mozRequestAnimationFrame
           || function (callback) {
             window.setTimeout(callback, 1000 / 60);
           })();
// Mouse Coordinate Positioning
function writeMessage(canvas, message) {
  const context = canvasid.getContext('2d');
  context.clearRect(0, 0, canvasid.width, canvasid.height);
  context.font = '18pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
  // console.log(message);
}

function getMousePos(canvas, evt) {
  const rect = canvasid.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function drawMap(canvas) {
  const background = canvas;
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[i].length; j++) {
      if (parseInt(mapArray[i][j]) == 0) {
        var newTile = {
          // color: "#00A",
          tile: Tile('emptyTile'),
          x: j * 60,
          y: i * 60,
          width:	60,
          height: 60,
          type: 'floor',
          draw() {
            // canvas.fillStyle = this.color;
            // canvas.fillRect(this.x, this.y, this.width, this.height);
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };

        tileArray.push(newTile);
        // console.log(newTile.x);
        //  <!--canvas.drawImage(image1, x*28, y*28);-->
      }
      if (parseInt(mapArray[i][j]) == 1) {
        var newTile = {
          // color: "#00A",
          tile: Tile('redTile'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'wall',

          draw() {
            // canvas.fillStyle = this.color;
            // canvas.fillRect(this.x, this.y, this.width, this.height);
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
        // canvas.drawImage(image2, x*28, y*28);-->
      }
      if (parseInt(mapArray[i][j]) == 3) {
        var newTile = {
          // color: "#00A",
          tile: Tile('emptyTile'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'player1spawn',

          draw() {
            // canvas.fillStyle = this.color;
            // canvas.fillRect(this.x, this.y, this.width, this.height);
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
        player1spawns.push(newTile);
        // canvas.drawImage(image2, x*28, y*28);-->
      }
      if (parseInt(mapArray[i][j]) == 2) {
        var newTile = {
          // color: "#00A",
          tile: Tile('emptyTile'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'player2spawn',

          draw() {
            // canvas.fillStyle = this.color;
            // canvas.fillRect(this.x, this.y, this.width, this.height);
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
        player2spawns.push(newTile);
        // canvas.drawImage(image2, x*28, y*28);-->
      }

      // background.addChild(tile);-->
    }
  }
  // canvas.addChild(background);-->
  return tileArray;
}

// Create The player
window.player = {
  // color: "#00A",
  sprite: Sprite('spaceship'),
  x: 220,
  y: 680,
  width: 32,
  height: 32,
  life: 100,
  velX: 0,
  velY: 0,
  speed: 4,
  friction: 0.85,
  draw() {
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x, this.y, this.width, this.height);
    this.sprite.draw(canvas, this.x, this.y);
  },
  shoot() {
    const bulletPosition = this.midpoint();
    shoot_sound.play();

    window.playerBullets.push(new Bullet(5, bulletPosition.x, bulletPosition.y));
  },
  launch() {
    const missilePostition = this.midpoint();
    console.log(Missile.width);
    window.playerMissiles.push(new Missile(2, missilePostition.x - 500, missilePostition.y));
  },
  midpoint() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  },
  explode() {
    this.active = false;
    explosion_sound.play();
    GameLoopMusic_sound.fadeOut(0, 2000);
    window.currentState = window.states.End;
    // An explosion sound and then end the game
  },
  lifeChange(change) {
    this.life += change; // Adds or subtracts health based on the value added in the function

    if (this.life <= 0) {
      this.explode();
    }

    return this.life;
  },
};
window.playerBullets = [];

const context = canvas;

// canvasid.addEventListener('mousemove', (evt) => {
//   mousePos = getMousePos(canvasid, evt);
//   const message = `Mouse position: ${mousePos.x},${mousePos.y}`;
//   writeMessage(canvas, message);
// }, false);

function update() { // Updates location and reaction of objects to the canvas
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
    }
  }

  if (window.currentState === window.states.Game) {
    // window.player Movement Controls
    if (keydown.left) {
      if (window.player.velX > -window.player.speed) {
        window.player.velX--;
      }
    }

    if (keydown.right) {
      if (window.player.velX < window.player.speed) {
        window.player.velX++;
      }
    }

    if (keydown.up) {
      if (window.player.velY > -window.player.speed) {
        window.player.velY--;
      }
    }

    if (keydown.down) {
      if (window.player.velY < window.player.speed) {
        window.player.velY++;
      }
    }

    window.player.velX *= window.player.friction;
    window.player.x += window.player.velX;
    window.player.velY *= window.player.friction;
    window.player.y += window.player.velY;
    // prevents character from going past canvas
    window.player.x = window.player.x.clamp(0, CANVAS_WIDTH - window.player.width);
    // prevents character from going past canvas
    window.player.y = window.player.y.clamp(0, CANVAS_HEIGHT - window.player.height);

    // window.player actions
    if (keydown.space) {
      window.player.shoot();
    }

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

    // Enemy Update logic
    window.enemies.forEach((enemy) => {
      enemy.update();
    });

    window.enemies = window.enemies.filter((enemy) => enemy.active);

    if (Math.random() < 0.1) {
      window.enemies.push(new Enemy());
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

function gameloop() {
  controller();
  if (paused == false) {
    update();
    draw();
  }
  window.requestAnimFrame(gameloop);
}

var paused = false;

window.requestAnimFrame(gameloop);

setUpKeys();

let notyet = 0;
function clearTimer() {
  notyet = 0;
}

function pauseGame() {
  if (notyet == 1) {
    console.log('waiting');
    return;
  }
  notyet = 1;
  paused = !paused;
  setTimeout(clearTimer(), 2000);
}

// console.log(keydown.esc);

// Canvas Utlity for preventing objects from going over the edge
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

// Text Variables
const splashTextX = CANVAS_WIDTH / 3;
const splashTextY = 0;
const endTextX = CANVAS_WIDTH / 3;
const endTextY = 0;

window.playerMissiles = [];

window.enemies = [];

function controller() {
  // Pause the game
  if (keydown.p) {
    pauseGame();
    console.log(paused);
  }
}
