import mapArray from './mapArray.js';

export default function drawMap(canvas) {
  const background = canvas;
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[i].length; j++) {
      if (parseInt(mapArray[i][j]) == 0) {
        var newTile = {
          // color: "#00A",
          tile: Tile('emptyTile'),
          x: j * 60,
          y: i * 60,
          width:	60,
          height: 60,
          type: 'floor',
          draw() {
            // canvas.fillStyle = this.color;
            // canvas.fillRect(this.x, this.y, this.width, this.height);
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };

        tileArray.push(newTile);
        // console.log(newTile.x);
        //  <!--canvas.drawImage(image1, x*28, y*28);-->
      }
      else if (parseInt(mapArray[i][j]) == 1) {
        var newTile = {
          // color: "#00A",
          tile: Tile('WallReference_07'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'wall',

          draw() {
            // canvas.fillStyle = this.color;
            // canvas.fillRect(this.x, this.y, this.width, this.height);
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
        // canvas.drawImage(image2, x*28, y*28);-->
      }
    else if (parseInt(mapArray[i][j]) == 2) {
        var newTile = {
          tile: Tile('paintbucket'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'pickup',
          active: true,
          draw() {
            if(this.active){
              this.tile.draw(canvas, this.x, this.y, 60, 60);
            }

          },
        };
        tileArray.push(newTile);
      } 
      else if (parseInt(mapArray[i][j]) == 3) {
        var newTile = {
          tile: Tile('PuddleReference_45'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'puddle',
          active: true,
          draw() {
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
      }
      else if (parseInt(mapArray[i][j]) == 4) {
        var newTile = {
          tile: Tile('PuddleReference_31'),
          secondaryTile: Tile('PuddleReference_14'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'puddle',
          active: true,
          draw() {
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
      }
      else if (parseInt(mapArray[i][j]) == 5) {
        var newTile = {
          tile: Tile('PuddleReference_14'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'puddle',
          active: true,
          draw() {
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
      }

    }
  }
  // canvas.addChild(background);-->
  return tileArray;
}
