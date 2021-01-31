import { shoot_sound, explosion_sound, walk_sound } from './utils/initAudio.js';

import Bullet from './projectile/Bullet.js';
import Missile from './projectile/Missile.js';
import sendData from '../ws.js';

/**
 * Creates the player character that the user controls
 */
export default class Player {
  constructor(spriteimg, name, alias, order, color, reload, startingX, startingY, websocket) {
    this.socket = window.socket;
    // color: "#00A",
    this.sprite = Sprite(spriteimg);
    this.hiddensprite = Sprite("WallReference_07");
    this.playerSet = false;
    this.x = startingX;
    this.y = startingY;
    this.width = 32;
    this.height = 32;
    this.life = 100;
    this.velX = 0;
    this.velY = 0;
    this.speed = 4;
    this.friction = 0.85;
    this.pointScore = 0;
    this.order = order;
    this.name = name;
    this.aka = alias;
    this.color = color;
    this.isMoving = true;
    this.websocket = websocket;
    this.isIt = true;
    this.isImmune = false;
    this.activePuddle = false;
    this.trailCap = 20;
    this.pointMultiplier = 1;
    this.traveltrail = [];
    this.lastX = 0;
    this.lastY = 0;
    this.movediffX = () => Math.abs(this.lastX - this.x);
    this.movediffY = () => Math.abs(this.lastY - this.y);
    this.debounceEvent = (callback, time = 2000, interval) => (...args) => clearTimeout(interval, interval = setTimeout(() => callback(...args), time));
    this.draw = function () {
      // canvas.fillStyle = this.color;
      // canvas.fillRect(this.x, this.y, this.width, this.height);
      if(this.movediffX() < 1 && this.movediffY() < 1){
        this.hiddensprite.draw(canvas, this.x, this.y);
      } 
      else{
        this.sprite.draw(canvas, this.x, this.y);
      }
     
    };
    this.drawView = function () {
      const { xView } = window.camera;
      const { yView } = window.camera;
      console.log('here');
      canvas.save();
      canvas.fillStyle = 'yellow';
      // before draw we need to convert player world's position to canvas position
      canvas.fillRect((this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, this.width, this.height);
      canvas.restore();

      // this.sprite.draw(canvas, window.camera.xView, window.camera.yView);
    };
    this.shoot = function () {
      const bulletPosition = this.midpoint();
      shoot_sound.play();

      window.playerBullets.push(new Bullet(5, bulletPosition.x, bulletPosition.y));
    };
    this.launch = function () {
      const missilePostition = this.midpoint();
      console.log(Missile.width);
      window.playerMissiles.push(new Missile(2, missilePostition.x - 500, missilePostition.y));
    };
    this.midpoint = function () {
      return {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
      };
    };
    this.explode = function () {
      this.active = false;
      explosion_sound.play();
      // GameLoopMusic_sound.fadeOut(0, 2000);
      window.currentState = window.states.END;
      // An explosion sound and then end the game
    };
    this.lifeChange = function (change) {
      this.life += change; // Adds or subtracts health based on the value added in the function

      if (this.life <= 0) {
        this.explode();
      }

      return this.life;
    };
    this.score = function (change) {
      this.pointScore += change * this.pointMultiplier; // Adds or subtracts health based on the value added in the function
      return this.pointScore;
    };
    this.puddleTimer = function () {
      this.traveltrail = [];
      // this.trailCap = 20;

      var puddleInterval = setInterval(() => {
        this.trailMechanics();
      }, 250);

      var oldPuddleRemoval = setInterval(() => {
        this.traveltrail.shift();
      }, 1000);

      setTimeout(() => {
        console.log('TURN OFF trail');
        this.activePuddle = false;
        clearTimeout(puddleInterval);
        //clearTimeout(oldPuddleRemoval);
      }, 15000);
    };
    this.trailMechanics = function () {
      this.traveltrail.push({ x: this.x, y: this.y });
      if (this.traveltrail.length >= this.trailCap) {
        this.traveltrail.shift();
      }
    };
    this.updateStartingXY = function(newX, newY){
      this.startingX = newX;
      this.startingY = newY;
    }
    this.movement = function () {
      
      let left; let right; let up; let
        down;
      this.isMoving = false;
      if (alias == 'player1') {
        left = keydown.left;
        right = keydown.right;
        up = keydown.up;
        down = keydown.down;
      }

      if (alias == 'player2') {
        left = keydown.a;
        right = keydown.d;
        up = keydown.w;
        down = keydown.s;
      }
      if (alias == 'player3') {
        left = keydown.j;
        right = keydown.l;
        up = keydown.i;
        down = keydown.k;
      }
      if (left) {
        if (this.velX > -this.speed) {
          this.velX--;
          this.isMoving = true;
          // if(this.velX !== 0)
        }
      }

      if (right) {
        if (this.velX < this.speed) {
          this.velX++;
          this.isMoving = true;
          // if(this.velX !== 0)
        }
      }

      if (up) {
        if (this.velY > -this.speed) {
          this.velY--;
          this.isMoving = true;
        }
      }

      if (down) {
        if (this.velY < this.speed) {
          this.velY++;
          this.isMoving = true;
        }
      }
      this.lastX = this.x;
      this.lastY = this.y;

      this.velX *= this.friction;
      this.x += this.velX;

      this.velY *= this.friction;
      this.y += this.velY;

      this.x = this.x.clamp(0, CANVAS_WIDTH - this.width); // prevents character from going past canvas

      this.y = this.y.clamp(0, CANVAS_HEIGHT - this.height); // prevents character from going past canvas
      const playerPos = {
        type: "playerMovement",
        playerName: this.name,
        x: this.x,
        y: this.y,
      };

      if(Math.random() > 0.99){
        //walk_sound.play();
      }

      const d = this.debounceEvent(() => this.trailMechanics, 2000);
      sendData(playerPos);
      this.setValues('playerMovement');
  //     window.socket.onmessage = function (message) {
        
  // }
}
  this.setStartData = function () {
    const startData = {
      type: 'gameStart',
    };
    sendData(startData);
    return this.setValues('setStartData');
    
  };

  this.setValues =  function (type) {
    return new Promise((resolve, reject) => {
      window.socket.onmessage = function (message) {
        if(type === 'setStartData'){
        console.log(`Message in player: ${JSON.stringify(message.data)}`);
        const playerObj = JSON.parse(message.data);
        if (window.player.isSet == false) {
          console.log(`Player name is: ${playerObj.playerName}`);
          window.player.name = playerObj.playerName;
          window.player.startingX = playerObj.x;
          window.player.startingY = playerObj.y;
          console.log(`X is now: ${window.player.x}`);
          window.player.isSet == true;
        } else {
          window.allPlayersSet = playerObj.startGame;
        }

        resolve(JSON.stringify(playerObj));
      
      window.socket.onerror = function (err) {
        reject(err);
      };
      }
      else if(type == 'playerMovement'){
        console.log(`Message received in player movement ${message.data}`);
        const playerObj = JSON.parse(message.data);
        window.playerArray.forEach(p => {
          playerObj.forEach(wsPlayer =>{
            if(wsPlayer.playerName == 'Player 1'){
              p.x =  wsPlayer.x
              p.y = wsPlayer.y;
              console.log(`Player 1 start x is ${p.x}`);
            }
            else if(wsPlayer.playerName == 'Player 2'){
              p.x = wsPlayer.x
              p.y = wsPlayer.y;
              console.log(`Player 2 start x is ${p.x}`);
            }
            else if(wsPlayer.playerName == 'Player 3'){
              p = wsPlayer.x
              p = wsPlayer.y;
              console.log(`Player 3 start x is ${p.x}`);
            }
          })
      })
      }
      
      }
    });
  }
}
}