import { drawTimer } from './js/utils/timer.js';
import drawPlayerUI from './js/utils/drawPlayerUI.js';
import { writeMessage, drawImageRotated } from './js/utils/commonCanvasOperations.js';
import drawTrail from './js/drawTrails.js';
import drawTagMsg from './js/drawTagMsg.js';
import drawPowerMsg from './js/drawPowerMsg.js';

const lobbyIcon = new Image();
lobbyIcon.src = 'images/lobbyIcon.png';

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

      writeMessage('WAITING IN THE LOBBY FOR OTHER PLAYERS TO CONNECT...');
      drawImageRotated(lobbyIcon, CANVAS_WIDTH / 2, 500, Math.random() * 5);
      if (keydown.space) {
        writeMessage('Player 1 Ready!', 50, false);
      }
      // canvas.drawImage(lobbyIcon, 500 , 275, lobbyIcon.width, lobbyIcon.height);

      break;

    case window.states.GAME:
      
      if (window.cameraFollow === false) {
        window.parallax.Draw(); // draw background
        drawTrail();
        window.playerArray.forEach((p) => {
          p.draw();
        });

        tileArray.forEach((tile) => {
          tile.draw();
        });

        
       
        window.playerArray.forEach((p) => {
          if (p.isMoving == true) {
            p.draw();
          }
        });
      } else {
        canvas.translate(-window.player.x, -window.player.y);
        canvas.scale(2, 2);
        window.parallax.Draw(); // draw background
        drawTrail();
        playerArray[0].draw();

        tileArray.forEach((tile) => {
          tile.draw();
        });

        
     
        window.playerArray.forEach((p) => {
          if (p.isMoving == true) {
            p.draw();
          }
        });

        canvas.scale(0.5, 0.5);
        canvas.translate(window.player.x, window.player.y);
      }

      drawPlayerUI();
      drawTimer();
      drawPowerMsg();
      drawTagMsg();
      break;

    case window.states.END:

      window.winners =  [{name:"thing",score:5},{name:"THING2",score:15},{name:"THING3",score:35} ]




      canvas.fillStyle = '#F00'; // Set color to red
      canvas.font = '25pt Calibri';
      const GameOVER_TEXT = 'The Final Score is...';
      window.endTextX = canvas.measureText(GameOVER_TEXT).width; // Centers the text based on length
      window.endTextY = CANVAS_HEIGHT/2;
      // /debugger;
      // canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH/2) - (GameOVER_TEXTx/2) , CANVAS_HEIGHT-CANVAS_HEIGHT/4);
      canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY - 90);

      const thirdPlace = '' + window.winners[0].name + ' in Third with ' +  window.winners[0].score + ' points';
      canvas.fillStyle = '#FFF'; // Set color to black
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText(thirdPlace).width;
      canvas.fillText(thirdPlace, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY - 45);

      const secondPlace = '' + window.winners[1].name + ' in Second with ' +  window.winners[1].score + ' points';
      canvas.fillStyle = '#FFF'; // Set color to black
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText(secondPlace).width;
      canvas.fillText(secondPlace, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY - 0);


      const firstPlace = '' + window.winners[2].name + ' in First with ' +  window.winners[2].score + ' points';
      canvas.fillStyle = '#FFF'; // Set color to black
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText(firstPlace).width;
      canvas.fillText(firstPlace, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 45);

      canvas.fillStyle = '#FFF'; 
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText('Blake Balick-Screiber Backend Development').width;
      canvas.fillText('Blake Balick-Screiber Backend Development', (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 90);

      canvas.fillStyle = '#FFF'; 
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText('Scott Crockett Art Design').width;
      canvas.fillText('Scott Crockett Art Design', (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 135);

      canvas.fillStyle = '#FFF'; 
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText('Humberto Horruitiner Sound Design').width;
      canvas.fillText('Humberto Horruitiner Sound Design', (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 180);

      canvas.fillStyle = '#FFF'; 
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText('Corey Jeffers Frontend Development').width;
      canvas.fillText('Corey Jeffers Frontend Development', (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 225);
      break;
  }
}
