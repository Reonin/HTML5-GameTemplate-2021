import { drawTimer } from './js/utils/timer.js';
import drawPlayerUI from './js/utils/drawPlayerUI.js';
import { writeMessage, drawImageRotated, drawStrokedText } from './js/utils/commonCanvasOperations.js';
import drawTrail from './js/drawTrails.js';
import drawTagMsg from './js/drawTagMsg.js';
import drawPowerMsg from './js/drawPowerMsg.js';
import overlayInstructions from './js/drawInstructions.js';

const lobbyIcon = new Image();
lobbyIcon.src = 'images/lobbyIcon.png';

const brushIcon = new Image();
brushIcon.src = 'images/paintbucket.png';

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
      
      const flashingColor = Math.random() > 0.5 ? '#F00' : '#FF0';
      canvas.font = 'bold 90pt Roboto';
      const GAME_NAME_TEXT = 'Brush it Off';
      const gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
      drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 2, flashingColor);
     

      drawImageRotated(brushIcon, CANVAS_WIDTH / 2, CANVAS_HEIGHT - CANVAS_HEIGHT / 2 + 100, 0 );

      canvas.font = 'bold 50pt Roboto';
      let SPACEBAR_TEXT = 'Press Space to Continue';
      let spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
      drawStrokedText(canvas, SPACEBAR_TEXT, CANVAS_WIDTH / 2 - spaceBarTextx / 2, CANVAS_HEIGHT - CANVAS_HEIGHT / 4, "#FFF");

      SPACEBAR_TEXT = 'Hold Shift for Instructions';
      spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
      drawStrokedText(canvas, SPACEBAR_TEXT, CANVAS_WIDTH / 2 - spaceBarTextx / 2, CANVAS_HEIGHT - CANVAS_HEIGHT / 4 + 200, "#FFF");
      overlayInstructions();
  
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
        tileArray.forEach((tile) => {
          tile.draw();
        });

        window.playerArray.forEach((p) => {
            p.draw();
        });
      } else {
        canvas.translate(-window.player.x, -window.player.y);
        canvas.scale(2, 2); //zoom in
        window.parallax.Draw(); // draw background
        drawTrail();
   
        tileArray.forEach((tile) => {
          tile.draw();
        });

        window.playerArray.forEach((p) => {
          p.draw();
        });
        //zoom back to normal view
        canvas.scale(0.5, 0.5);
        canvas.translate(window.player.x, window.player.y);
      }

      drawPlayerUI();
      drawTimer();
      drawPowerMsg();
      drawTagMsg();
     overlayInstructions();
      break;

    case window.states.END:

     // window.winners =  [{name:"thing",score:5},{name:"THING2",score:15},{name:"THING3",score:35} ];

      canvas.fillStyle = '#F00'; // Set color to red
      canvas.font = '25pt Roboto';
      const GameOVER_TEXT = 'The Final Score is...';
      window.endTextX = canvas.measureText(GameOVER_TEXT).width; // Centers the text based on length
      window.endTextY = CANVAS_HEIGHT / 2;
      drawStrokedText(canvas, GameOVER_TEXT, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY - 90, "#FFF");
      // /debugger;
      // canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH/2) - (GameOVER_TEXTx/2) , CANVAS_HEIGHT-CANVAS_HEIGHT/4);
     // canvas.fillText(GameOVER_TEXT, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY - 90);

      const thirdPlace = `${window.winners[0].alias} in Third with ${window.winners[0].pointScore} points`;
      canvas.fillStyle = '#FFF'; // Set color to black
      canvas.font = '20pt Roboto';
      window.endTextX = canvas.measureText(thirdPlace).width;
      canvas.fillText(thirdPlace, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY - 45);

      const secondPlace = `${window.winners[1].alias} in Second with ${window.winners[1].pointScore} points`;
      canvas.fillStyle = '#FFF'; // Set color to black
      canvas.font = '20pt Roboto';
      window.endTextX = canvas.measureText(secondPlace).width;
      canvas.fillText(secondPlace, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY - 0);

      const firstPlace = `${window.winners[2].alias} in First with ${window.winners[2].pointScore} points`;
      const flashingColorWin = Math.random() > 0.5 ? '#F00' : '#FF0';
      canvas.font = '20pt Roboto';
      const winText = canvas.measureText(firstPlace).width; // Centers the text based on length
      drawStrokedText(canvas, firstPlace, CANVAS_WIDTH / 2 - winText / 2, window.endTextY + 45, flashingColorWin);

      drawStrokedText(canvas, "TEAM", CANVAS_WIDTH / 2 - canvas.measureText("TEAM").width / 2, window.endTextY + 140, "#bada55");

      canvas.fillStyle = '#FFF';
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText('Blake Balick-Screiber - Backend Development').width;
      canvas.fillText('Blake Balick-Screiber - Backend Development', (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 190);

      canvas.fillStyle = '#FFF';
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText('Scott Crockett - Art Design').width;
      canvas.fillText('Scott Crockett - Art Design', (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 235);

      canvas.fillStyle = '#FFF';
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText('Humberto Horruitiner - Sound Design').width;
      canvas.fillText('Humberto Horruitiner - Sound Design', (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 280);

      canvas.fillStyle = '#FFF';
      canvas.font = '20pt Calibri';
      window.endTextX = canvas.measureText('Corey Jeffers - Frontend Development').width;
      canvas.fillText('Corey Jeffers - Frontend Development', (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 325);

      const specialThanks = "Special Thanks to Kenny Buhl, Tyler Jackson, Jahmique Desouza, Matt ";
      window.endTextX = canvas.measureText(specialThanks).width;
      
      drawStrokedText(canvas, specialThanks, (CANVAS_WIDTH / 2) - (window.endTextX / 2), window.endTextY + 525, "#FFF" );
      break;
  }
}
