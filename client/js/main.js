import scaletosmallest from './utils/scaletosmallest.js';
import Player from './player.js';
import OtherPlayer from './otherPlayer.js';
import { setUpKeys } from './utils/setupKeys.js';
import drawMap from './drawMap.js';
import draw from '../draw.js';
import ParallaxScrolling from './parallax.js';
import Camera from './camera/camera.js';

import update from './update.js';
// import { collisionDetection } from './collisionDetection.js';
window.socket = new WebSocket('ws://localhost:3000');
// parses the player object data
window.socket.onmessage = function (event) {
  console.debug('WebSocket message received:', event);
  const playerData = JSON.parse(event.data); // TODO ensure this isn't a string
  const playersMap = new Map(Object.entries(playerData)); // then creates a map from it
  // console.log(playersMap.get('Player 1')); //can pull the x/y values of player here
};

scaletosmallest(canvasid, ratio);
$(window).on('resize', () => {
  scaletosmallest(canvasid, ratio);
});

// Draw tile map
drawMap(canvas);

window.states = Object.freeze({
  SPLASH: Symbol(),
  TITLE: Symbol(),
  LOBBY: Symbol(),
  GAME: Symbol(),
  END: Symbol(),
});

window.currentState = window.states.TITLE;

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

function getMousePos(canvas, evt) {
  const rect = canvasid.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

window.player = new Player('Brush2', 1, '#D3D3D3', 'reload1()', 967, 516, socket);
window.player2 = new OtherPlayer('brush4', 2, '#0000FF', 'reload2()', 877, 445, socket);
window.player3 = new OtherPlayer('Brush5', 3, '#FF0000', 'reload3()', 1098, 445, socket);
// Extend PLayer class to OtherPLayer that receives X/Y data from server

// window.playerBullets = [];

window.timer = '5:10';

// canvasid.addEventListener('mousemove', (evt) => {
//   mousePos = getMousePos(canvasid, evt);
//   const message = `Mouse position: ${mousePos.x},${mousePos.y}`;
//   writeMessage(canvas, message);
// }, false);

setUpKeys();
const isPaused = false;
window.onkeydown = () => {
  if (keydown.p) {
    // isPaused = !isPaused; // flips the pause state
  }
};

function Start() {
  if (!isPaused) {
    update();
    draw();
  }

  window.requestAnimFrame(Start);
}
const layer = ['images/Floor.png'];
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
window.player.isSet = [false,false,false];

window.panVal = [9, 9];
window.cameraFollow = true;
window.localPlayerSet = false;
window.allPlayersSet = false;
window.tagState = null;
window.whoAmI = '';
window.allPlayersReady = () => {
  // check websocket message of other players
  if (false) {
    window.whoAmI = 'P1';
    return true;
  }

  return false;
};
