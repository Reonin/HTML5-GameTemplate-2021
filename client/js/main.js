import scaletosmallest from './utils/scaletosmallest.js';
import Player from './player.js';
import { setUpKeys } from './utils/setUpKeys.js';
import drawMap from './drawMap.js';
import draw from '../draw.js';
import ParallaxScrolling from './parallax.js';
import Camera from './camera/camera.js';
import { GameLoopMusic_sound } from './utils/initAudio.js'; // initialize Audio

import update from './update.js';
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

const viewPortW = 480;
const viewPortH = 270;
// Set the right viewport size for the camera
const vWidth = Math.min(viewPortW, CANVAS_WIDTH);
const vHeight = Math.min(viewPortH, CANVAS_HEIGHT);
// Setup the camera
window.camera = new Camera(0, 0, vWidth, vHeight, viewPortW, viewPortH);

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

window.player = new Player('spaceship', 'Player 1', 'player1', 1, '#D3D3D3', 'reload1()', 100, 100);
window.player2 = new Player('pixel_spaceship', 'Player 2', 'player2', 2, '#0000FF', 'reload2()', 200, 680);
window.player3 = new Player('redShip', 'Player 3', 'player3', 3, '#FF0000', 'reload3()', 300, 680);

window.playerBullets = [];

window.timer = '5:10';

// canvasid.addEventListener('mousemove', (evt) => {
//   mousePos = getMousePos(canvasid, evt);
//   const message = `Mouse position: ${mousePos.x},${mousePos.y}`;
//   writeMessage(canvas, message);
// }, false);

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
const layer = ['images/blackOverlay.png', 'images/blackOverlay.png'];
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

window.playerArray = [window.player, window.player2, window.player3];
window.camera.follow(window.playerArray[0], vWidth / 2, vHeight / 2);
window.playerMissiles = [];

window.enemies = [];
window.pickups = [];
window.bufferHoriz = 0;
window.bufferVert = 0;
window.panVal = [9, 9];
window.cameraFollow = true;
