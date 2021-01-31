import { drawStrokedText } from "./utils/commonCanvasOperations.js";

export default function overlayInstructions(){

    if (keydown.shift) {
        console.log("INSTRUCTIONS")

        canvas.fillStyle = "#000";
        canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);

        canvas.font = 'bold 30pt Roboto';
        let GAME_NAME_TEXT = 'Player 1 controls WASD';
        let gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8, "#FF0");
  
      
        GAME_NAME_TEXT = 'Player 2 controls IJKL';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + 100, "#FF0");
  
  
     
        GAME_NAME_TEXT = 'Player 3 controls RIGHT, LEFT, UP,DOWN Arrows';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + 200, "#FF0");
  
  
  
        GAME_NAME_TEXT = 'Player with the blue ink trail is IT';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + 300, "#FF0");
  
        GAME_NAME_TEXT = 'IT chases other players and tags them for points.';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + 340, "#FF0");
  
  
        GAME_NAME_TEXT = 'Other players get points by hiding and picking up powerups';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + 380, "#FF0");
  
        GAME_NAME_TEXT = 'All players can pick up powerups but only non IT get points from it';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + 420, "#FF0");
  
      
      }
     
}