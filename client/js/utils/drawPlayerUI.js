
import {drawStrokedText} from './commonCanvasOperations.js';

export default function drawPlayerUI() {
  const hudBar2Slide = 400;
  const hudBar3Slide = 800;
  var topBarCenter = 45;

  canvas.globalAlpha = 0.5;
  canvas.fillStyle = "#d8dce2";
  canvas.fillRect(0, 0, CANVAS_WIDTH, 60);
 

  canvas.globalAlpha = 1;
  canvas.textAlign = "left";
  // Player 1
  
  canvas.font = 'regular 24pt Potta One';
  drawStrokedText(canvas,'Player 1',20,topBarCenter,'#66fc99');


  canvas.fillStyle = '#000'; // Set color to black
  canvas.font = 'black 30pt Roboto';
  canvas.fillText(window.playerArray[0].pointScore, 218, topBarCenter);
  


  // Player 2


  canvas.font = 'regular 24pt Potta One';
  drawStrokedText(canvas,'Player 2',hudBar2Slide,topBarCenter,'#ffcc66');

  canvas.fillStyle = '#000'; // Set color to black
  canvas.font = 'black 30pt Roboto';
  canvas.fillText(window.playerArray[1].pointScore, hudBar2Slide + 200, topBarCenter);
  


  // Player 3
  canvas.font = 'regular 24pt Potta One';
  drawStrokedText(canvas,'Player 3',hudBar3Slide,topBarCenter,'#fc66ff');

  canvas.fillStyle = '#000'; // Set color to black
  canvas.font = 'black 30pt Roboto';
  canvas.fillText(window.playerArray[2].pointScore, hudBar3Slide + 200, topBarCenter);

}
