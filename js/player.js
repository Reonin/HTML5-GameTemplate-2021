import { shoot_sound } from './utils/initAudio.js';
import { explosion_sound } from './utils/initAudio.js';
import Bullet from './projectile/Bullet.js';
import Missile from './projectile/Missile.js';
import {GameLoopMusic_sound} from './utils/initAudio.js';
/**
 * Creates the player character that the user controls
 */
export default class Player {
  constructor() {
    {
      // color: "#00A",
      this.sprite = Sprite('spaceship');
      this.x = 220;
      this.y = 680;
      this.width = 32;
      this.height = 32;
      this.life = 100;
      this.velX = 0;
      this.velY = 0;
      this.speed = 4;
      this.friction = 0.85;
      this.pointScore = 0;
      this.draw = function () { 
        // canvas.fillStyle = this.color;
        // canvas.fillRect(this.x, this.y, this.width, this.height);
        this.sprite.draw(canvas, this.x, this.y);
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
        //GameLoopMusic_sound.fadeOut(0, 2000);
        window.currentState = window.states.End;
        // An explosion sound and then end the game
      };
      this.lifeChange = function (change) {
        this.life += change; // Adds or subtracts health based on the value added in the function

        if (this.life <= 0) {
          this.explode();
        }

        return this.life;
      };
      this.score = function(change) {


        this.pointScore = this.pointScore + change; //Adds or subtracts health based on the value added in the function

        /*if (this.life <= 0) {
            this.explode();
        }*/

        return this.pointScore;


    };
    }
  }
}
