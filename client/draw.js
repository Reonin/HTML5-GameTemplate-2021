import { drawTimer } from './js/utils/timer.js';
import drawPlayerUI from './js/utils/drawPlayerUI.js';

export default function draw() { // Draws objects to the canvas
  const canvas = document.getElementById('GameCanvasScreen').getContext('2d');
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  switch (window.currentState) {
    case window.states.SPLASH:
      canvas.fillStyle = '#000'; // Set color to black
      canvas.font = '25pt Calibri';
      const SPLASH_SCREEN_TEXT = 'The Full Palette';
      splashTextX = canvas.measureText(SPLASH_SCREEN_TEXT).width;
      canvas.fillText(SPLASH_SCREEN_TEXT, (CANVAS_WIDTH / 2) - (splashTextX / 2), splashTextY);
      
      break;
    case window.states.TITLE:
      canvas.fillStyle = '#000'; // Set color to black
      canvas.font = 'bold 40pt Calibri';
      const GAME_NAME_TEXT = 'Brush it Off';
      const gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
      canvas.fillText(GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - (gameTextx / 2) - 3, CANVAS_HEIGHT / 3);
      // The next two create a special text effect
      canvas.fillStyle = '#F00';
      canvas.fillText(GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - (gameTextx / 2), CANVAS_HEIGHT / 3);

      canvas.fillStyle = '00F';
      canvas.fillText(GAME_NAME_TEXT, (CANVAS_WIDTH / 2) - (gameTextx / 2) + 3, CANVAS_HEIGHT / 3);

      canvas.fillStyle = '#F00';
      canvas.font = 'bold 20pt Calibri';
      const SPACEBAR_TEXT = 'Press Space to Continue';
      const spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
      canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 4);

      break;

    case window.states.LOBBY:

      break;

    case window.states.GAME:
      if (window.cameraFollow === false) {
        window.playerArray.forEach((p) => {
          p.draw();
        });

        tileArray.forEach((tile) => {
          tile.draw();
        });

        window.parallax.Draw(); // draw background

        window.playerArray.forEach((p) => {
          if (p.isMoving == true) {
            p.draw();
          }
        });
      } else {
        // window.playerArray.forEach((p) => {
        if (Math.abs(player.movediffX()) < 3) {
          console.log(player.movediffX());
          window.panVal[0] = 0;
        } else {
          window.panVal[0] = 9;
        }

        if (Math.abs(player.movediffY()) < 3) {
          console.log(player.movediffY());
          window.panVal[1] = 0;
        } else {
          window.panVal[1] = 9;
        }

        canvas.translate(window.bufferHoriz, window.bufferVert);
        canvas.scale(2, 2);

        playerArray[0].draw();

        tileArray.forEach((tile) => {
          tile.draw();
        });

        window.parallax.Draw(); // draw background

        window.playerArray.forEach((p) => {
          if (p.isMoving == true) {
            p.draw();
          }
        });

        canvas.scale(0.5, 0.5);
        canvas.translate(-window.bufferHoriz, -window.bufferVert);
      }
      drawPlayerUI();
      drawTimer();
      break;

    case window.states.END:
      canvas.fillStyle = '#F00'; // Set color to red
      canvas.font = '25pt Calibri';

      const GameOVER_TEXT = 'Game Over';
      endTextX = canvas.measureText(GameOVER_TEXT).width; // Centers the text based on length
      // canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH/2) - (GameOVER_TEXTx/2) , CANVAS_HEIGHT-CANVAS_HEIGHT/4);
      canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY - 90);

      canvas.fillStyle = '#000'; // Set color to black
      canvas.font = '20pt Calibri';
      endTextX = canvas.measureText('First Firstnameson').width;
      canvas.fillText('First Firstnameson', (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY - 45);

      canvas.fillStyle = '#000'; // Set color to black
      canvas.font = '20pt Calibri';
      canvas.fillText('Second Secondton', (CANVAS_WIDTH / 2) - (endTextX / 2), endTextY);
      break;
  }
}
