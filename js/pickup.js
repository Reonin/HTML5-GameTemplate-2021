import { pickup_sound } from './initAudio.js';

export default class Pickup {
  constructor() {
    const P = this || {};

    P.active = true;
    P.age = Math.floor(Math.random() * 128);

    P.sprite = Sprite('powerup');
    // P.color = "#A2B";

    P.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
    P.y = 0;
    P.xVelocity = 0;
    P.yVelocity = 2;

    P.width = 32;
    P.height = 32;

    P.inBounds = function () {
      return P.x >= 0 && P.x <= CANVAS_WIDTH
            && P.y >= 0 && P.y <= CANVAS_HEIGHT;
    };

    P.draw = function () {
    // canvas.fillStyle = this.color;
    // canvas.fillRect(this.x, this.y, this.width, this.height);
      this.sprite.draw(canvas, this.x, this.y);
    };

    P.explode = function () {
      this.active = false;
      pickup_sound.play();
    // Extra Credit: Add an explosion graphic
    };

    P.update = function () {
      P.x += P.xVelocity;
      P.y += P.yVelocity;

      P.xVelocity = 3 * Math.sin(P.age * Math.PI / 64);

      P.age++;

      P.active = P.active && P.inBounds();
    };
  }
}
