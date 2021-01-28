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
      if (parseInt(mapArray[i][j]) == 1) {
        var newTile = {
          // color: "#00A",
          tile: Tile('redTile'),
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
      if (parseInt(mapArray[i][j]) == 3) {
        var newTile = {
          // color: "#00A",
          tile: Tile('emptyTile'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'player1spawn',

          draw() {
            // canvas.fillStyle = this.color;
            // canvas.fillRect(this.x, this.y, this.width, this.height);
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
        player1spawns.push(newTile);
        // canvas.drawImage(image2, x*28, y*28);-->
      }
      if (parseInt(mapArray[i][j]) == 2) {
        var newTile = {
          // color: "#00A",
          tile: Tile('emptyTile'),
          x: j * 60,
          y: i * 60,
          width: 60,
          height: 60,
          type: 'player2spawn',

          draw() {
            // canvas.fillStyle = this.color;
            // canvas.fillRect(this.x, this.y, this.width, this.height);
            this.tile.draw(canvas, this.x, this.y, 60, 60);
          },
        };
        tileArray.push(newTile);
        player2spawns.push(newTile);
        // canvas.drawImage(image2, x*28, y*28);-->
      }

      // background.addChild(tile);-->
    }
  }
  // canvas.addChild(background);-->
  return tileArray;
}
