import Player from './player.js';
import positionCheck from './AI.js';
import sendData from '../ws.js';
/**
 * Creates the enemy Players character that move around a game map
 */
export default class OtherPlayer extends Player {
  constructor(spriteimg, order, color, reload, startingX, startingY, websocket) {
    super(spriteimg, order, color, reload, startingX, startingY, websocket);

    this.isIt = false;
    this.checkAI = () => positionCheck(this);
    this.AImovement = function (overRide) {
      // debugger;
      let left; let right; let up; let
        down;
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
      if (left || overRide == 'left') {
        if (this.velX > -this.speed) {
          this.velX--;
          this.isMoving = true;
          // if(this.velX !== 0)
        }
      }

      if (right || overRide == 'right') {
        if (this.velX < this.speed) {
          this.velX++;
          this.isMoving = true;
          // if(this.velX !== 0)
        }
      }

      if (up || overRide == 'up') {
        if (this.velY > -this.speed) {
          this.velY--;
          this.isMoving = true;
        }
      }

      if (down || overRide == 'down') {
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
        playerName: this.name,
        x: this.x,
        y: this.y,
      };
      if (Math.random() > 0.80) {
        this.traveltrail.push({ x: this.x, y: this.y });
        if (this.traveltrail.length >= 20) {
          this.traveltrail.shift();
        }
      }

      // console.log(`The websocket ${websocket.url}`)
      // sendData(JSON.stringify(playerPos));
    };
    // const msg = {
    //   type: 'sendPlayerData',
    // };
    // sendData(msg);
    this.movement = function () {
      return new Promise((resolve, reject) => {
        window.socket.onmessage = function (message) {
          //console.log(`Message in player: ${message.data}`);
          const playerObj = message.data;
          // if (window.player.isSet == false) {
          //   window.player.x = playerObj.x;
          //   window.player.y = playerObj.y;
          //   console.log(`X is now: ${window.player.x}`);
          //   window.player.isSet == true;
          // } else {
          //   window.allPlayersSet = playerObj.startGame;
          // }
          // console.log(`Player object is ${playerObj}`);
          // console.log(`Player name is ${playerObj.playerName}\nWindow player name is ${window.player.name}`);

          const objectifiedPlayerObj = JSON.parse(playerObj);
          // objectifiedPlayerObj["Player 1"];
          // objectifiedPlayerObj["Player 2"];
          // objectifiedPlayerObj["Player 3"];

          objectifiedPlayerObj.forEach((po) => {
           // console.log(`${JSON.stringify(po)}`);
            // debugger;
            if (po.playerName == 'Player 1' && window.playerArray[0].name == 'Player 1') {
              const P1 = window.playerArray.find((p) => p.name == 'Player 1');
              P1.isIt = po.isIt;
            }
            if (po.playerName == 'Player 2' && window.playerArray[1].name == 'Player 2') {
              const P2 = window.playerArray.find((p) => p.name == 'Player 2');
              P2.x = po.x;
              P2.y = po.y;
              P2.isIt = po.isIt;
            }
            if (po.playerName == 'Player 3' && window.playerArray[2].name == 'Player 3') {
              const P3 = window.playerArray.find((p) => p.name == 'Player 3');
              P3.x = po.x;
              P3.y = po.y;
              P3.isIt = po.isIt;
            }
          });

          // if (objectifiedPlayerObj.playerName = 'Player 1') { // this player is launched as player 1
          //   const P1 = window.playerArray.find(p => p.name == "Player 1");
          //   P1.isIt = objectifiedPlayerObj["Player 1"].isIt;
          // }
          // else if (objectifiedPlayerObj.playerName) { // this player is launched as player 2
          //   const P2 = window.playerArray.find(p => p.name == "Player 2");
          //   P2.x = objectifiedPlayerObj.x;
          //   P2.y = objectifiedPlayerObj.y;
          //   P2.isIt = objectifiedPlayerObj.isIt;
          //  // console.log(`Player 2 x: ${this.x}\nPlayer 2 y: ${this.y}`)
          // } else if (objectifiedPlayerObj.playerName == 'Player 3') { // this player is launched as player 3
          //   const P3 = window.playerArray.find(p => p.name == "Player 3");
          //   P3.x = objectifiedPlayerObj.x;
          //   P3.y = objectifiedPlayerObj.y;
          //   P3.isIt = objectifiedPlayerObj.isIt;
          //  // console.log(`Player 3 x: ${this.x}\nPlayer 3 y: ${this.y}`)
          // }

          resolve(JSON.stringify(playerObj));
        };
        window.socket.onerror = function (err) {
          reject(err);
        };
      });
    };
  }
}
