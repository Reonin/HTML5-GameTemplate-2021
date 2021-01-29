import { shoot_sound, explosion_sound, GameLoopMusic_sound } from './utils/initAudio.js';

import Bullet from './projectile/Bullet.js';
import Missile from './projectile/Missile.js';
import sendData from '../ws.js';
/**
 * Creates the player character that the user controls
 */
export default class Player {
  constructor(spriteimg, name, alias, order, color, reload, startingX, startingY, websocket) {
    {
      // color: "#00A",
      this.sprite = Sprite(spriteimg);
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
      this.traveltrail = [];
      this.lastX = 0;
      this.lastY = 0;
      this.movediffX = () =>{return this.lastX - this.x};
      this.movediffY = () =>{return this.lastY - this.y};
      this.draw = function () {
        // canvas.fillStyle = this.color;
        // canvas.fillRect(this.x, this.y, this.width, this.height);
        this.sprite.draw(canvas, this.x, this.y);
      };
      this.drawView = function () {
        var xView = window.camera.xView;
        var yView = window.camera.yView;
        console.log("here")
        canvas.save();
        canvas.fillStyle = "yellow";
        // before draw we need to convert player world's position to canvas position			
        canvas.fillRect((this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, this.width, this.height);
        canvas.restore();

        //this.sprite.draw(canvas, window.camera.xView, window.camera.yView);
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
        this.pointScore += change; // Adds or subtracts health based on the value added in the function

        /* if (this.life <= 0) {
this.explode();
} */

        return this.pointScore;
      };

      this.movement = function (left, right, up, down) {
        // debugger;
        
        this.isMoving = false;
        if (alias == 'player1') {
          left = keydown.left;
          right = keydown.right;
          up = keydown.up;
          down = keydown.down;
        }
        // if(alias == 'player1' && keyup.left ){
        //   this.isMoving = false;
        // }

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
            if(this.velX !== 0)window.bufferHoriz+= window.panVal[0];
          }
        }

        if (right) {
          if (this.velX < this.speed) {
            this.velX++;
            this.isMoving = true;
           if(this.velX !== 0) window.bufferHoriz-= window.panVal[0];
          }
        }

        if (up) {
          if (this.velY > -this.speed) {
            this.velY--;
            this.isMoving = true;
            window.bufferVert+= window.panVal[1];
          }
        }

        if (down) {
          if (this.velY < this.speed) {
            this.velY++;
            this.isMoving = true;
            window.bufferVert-= window.panVal[1];
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
        var playerPos = {
          playerName : this.name,
          x : this.x,
          y: this.y
        };
        if(Math.random() > 0.85){
          this.traveltrail.push({x:this.x, y:this.y});
          if(this.traveltrail.length >= 20){
            this.traveltrail.shift();
          }
        }
       
        //console.log(`The websocket ${websocket.url}`)
        sendData(JSON.stringify(playerPos));
      };
    }
  }
}
