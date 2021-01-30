import Player from './player.js';
import positionCheck from './AI.js'
import sendData from '../ws.js';
/**
 * Creates the enemy Players character that move around a game map
 */
export default class OtherPlayer extends Player {
    constructor(spriteimg, name, alias, order, color, reload, startingX, startingY, websocket){
        super(spriteimg, name, alias, order, color, reload, startingX, startingY, websocket)
        
        this.isIt = false;
        this.checkAI = () => positionCheck(this);
        this.AImovement = function (overRide) {
            // debugger;
            let left, right, up, down;
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
            if (left || overRide == "left") {
              if (this.velX > -this.speed) {
                this.velX--;
                this.isMoving = true;
                //if(this.velX !== 0)
              
              }
            }
    
            if (right || overRide == "right") {
              if (this.velX < this.speed) {
                this.velX++;
                this.isMoving = true;
               //if(this.velX !== 0) 
               
              }
            }
    
            if (up ||  overRide == "up") {
              if (this.velY > -this.speed) {
                this.velY--;
                this.isMoving = true;
               
              }
            }
    
            if (down || overRide == "down") {
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
            var playerPos = {
              playerName : this.name,
              x : this.x,
              y: this.y
            };
            if(Math.random() > 0.80){
              this.traveltrail.push({x:this.x, y:this.y});
              if(this.traveltrail.length >= 20){
                this.traveltrail.shift();
              }
            }
           
            //console.log(`The websocket ${websocket.url}`)
           //sendData(JSON.stringify(playerPos));
          };
          var msg = {
            type: "sendPlayerData"
          }
          sendData(msg);
          this.movement = function(){

          }
        
    }

}