import { scaletosmallest } from './scaletosmallest.js';
import { Bullet } from './Bullet.js';
import { Enemy } from './Enemy.js';


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
    var background = canvas;
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
      console.log(Missle.width);
      window.playerMissiles.push(Missle({
        speed: 2,
        x: missilePostition.x - 500,
        y: missilePostition.y,
      }));
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
  
      playerMissiles.forEach((missle) => {
        missle.update();
      });
  
      playerMissiles = playerMissiles.filter((missle) => missle.active);
  
      // Enemy Update logic
      window.enemies.forEach((enemy) => {
        enemy.update();
      });
  
      window.enemies = window.enemies.filter((enemy) => enemy.active);
  
      if (Math.random() < 0.1) {
        window.enemies.push( new Enemy() );
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

// Keyboard Map
function setUpKeys() {
  window.keydown = {};

  function keyName(event) {
    return jQuery.hotkeys.specialKeys[event.which]
               || String.fromCharCode(event.which).toLowerCase();
  }

  $(document).bind('keydown', (event) => {
    keydown[keyName(event)] = true;
  });

  $(document).bind('keyup', (event) => {
    keydown[keyName(event)] = false;
  });
}
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
  setTimeout('clearTimer()', 500);
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

function Missle(I) {
  I.active = true;

  I.xVelocity = 0;
  I.mousePosX = mousePos.x;
  I.mousePosY = mousePos.y;
  I.yVelocity = -I.speed;
  I.width = 1002;
  I.height = 32;
  I.color = '#34DDDD';

  I.inBounds = function () {
    return I.x >= 0 && I.x <= CANVAS_WIDTH
               && I.y >= 0 && I.y <= CANVAS_HEIGHT;
  };

  I.draw = function () {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  I.update = function () {
    I.x += I.mousePosX;
    I.y += I.mousePosY + I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}

window.enemies = [];



// Collision Detection
function collides(a, b) {
  return a.x < b.x + b.width
           && a.x + a.width > b.x
           && a.y < b.y + b.height
           && a.y + a.height > b.y;
}

function collisionDetection() {
  /*
        * private function initialize()
        *
        * Initializes the object
        *
        */
  this.initialize = function () { };

  /*
        * public function hitTest()
        *
        * Checks if two objects collide. First with box-model detection
        * and then on a per-pixel detection.
        *
        * Both source and target objects are expected to look like this:
        *
        * {
        *    x: (Number) current x position,
        *    y: (Number) current y position,
        *    width: (Number) object height,
        *    height: (Number) object width,
        *    pixelmap: (Object) pixel map object generated from buildPixelMap()
        * }
        *
        * @param source (Object) The source object
        * @param target (Object) The target object
        *
        * @return boolean, true on collision
        *
        */
  this.hitTest = function (source, target) {
    let hit = false;
    const start = new Date().getTime();

    if (this.boxHitTest(source, target)) {
      if (this.pixelHitTest(source, target)) {
        hit = true;
      }
    }

    const end = new Date().getTime();

    if (hit == true) {
      // console.log( 'detection took: ' + (end - start) + 'ms' );
    }

    return hit;
  };

  /*
        * private function boxHitTest()
        *
        * Checks if two objects collide with box-model detection.
        *
        * Both source and target objects are expected to look like this:
        *
        * {
        *    x: (Number) current x position,
        *    y: (Number) current y position,
        *    width: (Number) object height,
        *    height: (Number) object width
        * }
        *
        * @param source (Object) The source object
        * @param target (Object) The target object
        *
        * @return boolean, true on collision
        *
        */
  this.boxHitTest = function (source, target) {
    return !(
      ((source.y + source.height) < (target.y))
               || (source.y > (target.y + target.height))
               || ((source.x + source.width) < target.x)
               || (source.x > (target.x + target.width))
    );
  };

  /*
        * private function pixelHitTest()
        *
        * Checks if two objects collide on a per-pixel detection.
        *
        * Both source and target objects are expected to look like this:
        *
        * {
        *    x: (Number) current x position,
        *    y: (Number) current y position,
        *    width: (Number) object height,
        *    height: (Number) object width,
        *    height: (Number) object width,
        *    pixelmap: (Object) pixel map object generated from buildPixelMap()
        * }
        *
        * @param source (Object) The source object
        * @param target (Object) The target object
        *
        * @return boolean, true on collision
        *
        */
  this.pixelHitTest = function (source, target) {
    const top = parseInt(Math.max(source.y, target.y));
    const bottom = parseInt(Math.min(source.y + source.height, target.y + target.height));
    const left = parseInt(Math.max(source.x, target.x));
    const right = parseInt(Math.min(source.x + source.width, target.x + target.width));

    for (let y = top; y < bottom; y++) {
      for (let x = left; x < right; x++) {
        const pixel1 = source.pixelMap.data[`${x - source.x}_${y - source.y}`];
        const pixel2 = target.pixelMap.data[`${x - target.x}_${y - target.y}`];

        if (!pixel1 || !pixel2) {
          continue;
        }

        if (pixel1.pixelData[3] == 255 && pixel2.pixelData[3] == 255) {
          return true;
        }
      }
    }

    return false;
  };

  /*
        * public function buildPixelMap()
        *
        * Creates a pixel map on a canvas image. Everything
        * with a opacity above 0 is treated as a collision point.
        * Lower resolution (higher number) will generate a faster
        * but less accurate map.
        *
        *
        * @param source (Object) The canvas object
        * @param resolution (int)(DEPRECATED!) The resolution of the map
        *
        * @return object, a pixelMap object
        *
        */
  this.buildPixelMap = function (source) {
    const resolution = 1;
    const ctx = source.getContext('2d');
    const pixelMap = [];

    for (let y = 0; y < source.height; y++) {
      for (let x = 0; x < source.width; x++) {
        const dataRowColOffset = `${y}_${x}`;// ((y * source.width) + x);
        const pixel = ctx.getImageData(x, y, resolution, resolution);
        const pixelData = pixel.data;

        pixelMap[dataRowColOffset] = { x, y, pixelData };
      }
    }
    return {
      data: pixelMap,
      resolution,
    };
  };

  // Initialize the collider
  this.initialize();

  // Return our outward facing interface.
  return {
    hitTest: this.hitTest.bind(this),
    buildPixelMap: this.buildPixelMap.bind(this),
  };
}
const myNewCollission = new collisionDetection();
function handleCollisions() {
  window.playerBullets.forEach((bullet) => {
    window.enemies.forEach((enemy) => {
      if (collides(bullet, enemy)) {
        enemy.explode();
        bullet.active = false;
      }
    });
  });

  window.playerMissiles.forEach((missle) => {
    window.enemies.forEach((enemy) => {
      if (collides(missle, enemy)) {
        enemy.explode();
        missle.active = false;
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



function controller() {
  // Pause the game
  if (keydown.p) {
    pauseGame();
    console.log(paused);
  }
}
