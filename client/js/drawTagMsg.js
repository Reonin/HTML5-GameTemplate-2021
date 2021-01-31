import { drawStrokedText } from "./utils/commonCanvasOperations.js";

export default function drawTagMdg(){
  const flashingColor = Math.random() > 0.5 ? '#F00' : '#FF0';
    if (window.tagState === 'tagger') {
      canvas.font = 'bold 30pt Roboto';
      const GAME_NAME_TEXT = 'YOU JUST TAGGED';
      const gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
      drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8, flashingColor);
      } else if (window.tagState === 'tagged') {
        canvas.font = 'bold 30pt Roboto';
        const GAME_NAME_TEXT = 'YOU GOT TAGGED';
        const gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8, flashingColor);
       
      }
} 