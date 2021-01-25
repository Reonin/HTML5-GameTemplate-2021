export class Enemy {
  constructor() {
    const I = this || {};


    I.active = true;
    I.age = Math.floor(Math.random() * 128);

    I.sprite = Sprite('enemy');
    // I.color = "#A2B";

    I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
    I.y = 0;
    I.xVelocity = 0;
    I.yVelocity = 2;

    I.width = 32;
    I.height = 32;

    I.inBounds = function () {
      return I.x >= 0 && I.x <= CANVAS_WIDTH
                     && I.y >= 0 && I.y <= CANVAS_HEIGHT;
    };

    I.draw = function () {
      // canvas.fillStyle = this.color;
      // canvas.fillRect(this.x, this.y, this.width, this.height);
      this.sprite.draw(canvas, this.x, this.y);
    };

    I.explode = function () {
      this.active = false;
      explosion_sound.play();
      // Extra Credit: Add an explosion graphic
    };

    I.update = function () {
      I.x += I.xVelocity;
      I.y += I.yVelocity;

      I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);

      I.age++;

      I.active = I.active && I.inBounds();
    };
  }
}
