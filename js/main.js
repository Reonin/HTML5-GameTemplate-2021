import scaletosmallest from './scaletosmallest.js';
import { GameLoopMusic_sound } from './initAudio.js'; // initialize Audio
import Enemy from './Enemy.js';
import { handleCollisions } from './handleCollisions.js';
import Player from './player.js';
import { setUpKeys } from './setUpKeys.js';
import drawMap from './drawMap.js';
import draw from '../draw.js';
import ParallaxScrolling from './parallax.js';
import { startTimer } from './timer.js';

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

/**
 * // shim layer with setTimeout fallback
 */
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



window.player = new Player();
window.playerBullets = [];

window.timer = '3:20';
startTimer();

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
    //Garbage collect the enemies out of the array
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

setUpKeys();
let isPaused = false;
window.onkeydown = () => {
    if (keydown.p) {
      isPaused = !isPaused; // flips the pause state
    }
  };


function Start() {
  if (!isPaused) {
    update();
    draw();
  }

  window.requestAnimFrame(Start);
}
const layer = ['images/space-wall.jpg', 'images/planet.png'];
window.parallax = new ParallaxScrolling(canvas, layer);

Start();

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
