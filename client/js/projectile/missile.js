/**
 * Creates a Projectile that follows the position of the mouse
 */
class Missile {
  constructor(speed, x, y) {
    const I = this;
    I.active = true;

    I.xVelocity = 0;
    I.mousePosX = mousePos.x;
    I.mousePosY = mousePos.y;
    I.yVelocity = -I.speed;
    I.width = 1002;
    I.height = 32;
    I.color = '#34DDDD';
    I.speed = speed;
    I.x = x;
    I.y = y;
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
  }
}

export default Missile;
