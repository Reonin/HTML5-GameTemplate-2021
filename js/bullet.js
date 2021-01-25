export class Bullet {

    constructor(speed, x , y){
       const I = this;
        I.speed = speed;
        I.x = x;
        I.y = y;
        I.active = true;
        I.xVelocity = 0;
        I.yVelocity = -I.speed;
        I.width = 3;
        I.height = 3;
        I.color = '#000';
      
        I.inBounds = function () {
            debugger;
          return I.x >= 0 && I.x <= CANVAS_WIDTH
                     && I.y >= 0 && I.y <= CANVAS_HEIGHT;
        };
      
        I.draw = function () {
          canvas.fillStyle = this.color;
          canvas.fillRect(this.x, this.y, this.width, this.height);
        };
      
        I.update = function () {
            I.x += I.xVelocity;
            I.y += I.yVelocity;
      
          I.active = I.active && I.inBounds();
        }
    }
   
  }