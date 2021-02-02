import { drawStrokedText, drawImageRotated} from "./utils/commonCanvasOperations.js";

const keyboardlayout = new Image();
keyboardlayout.src = 'images/keyboardlayout.png';

export default function overlayInstructions(){

    if (keydown.shift) {
        console.log("INSTRUCTIONS")

        canvas.fillStyle = "#000";
        canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);


        drawImageRotated(keyboardlayout,1000,300,0 );

        canvas.font = 'bold 30pt Roboto';
        let GAME_NAME_TEXT = 'Player 1';
        let gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, 325, CANVAS_HEIGHT / 8, "#66fc99");
  
      
        GAME_NAME_TEXT = 'Player 2';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT,825, CANVAS_HEIGHT / 8, "#ffcc66");
  
  
     
        GAME_NAME_TEXT = 'Player 3';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, 1325, CANVAS_HEIGHT / 8, "#fc66ff");
  
        let horizontalplacer = 325;
        GAME_NAME_TEXT = 'W';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 65, CANVAS_HEIGHT / 8 + 100, "#66fc99");
        GAME_NAME_TEXT = 'A';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer - 65, CANVAS_HEIGHT / 8 + 220, "#66fc99");
        GAME_NAME_TEXT = 'S';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 65, CANVAS_HEIGHT / 8 + 220, "#66fc99");
        GAME_NAME_TEXT = 'D';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 200, CANVAS_HEIGHT / 8 + 220, "#66fc99");

        horizontalplacer += 510;
        GAME_NAME_TEXT = 'I';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 65, CANVAS_HEIGHT / 8 + 100, "#ffcc66");
        GAME_NAME_TEXT = 'J';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer - 65, CANVAS_HEIGHT / 8 + 220, "#ffcc66");
        GAME_NAME_TEXT = 'K';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 65, CANVAS_HEIGHT / 8 + 220, "#ffcc66");
        GAME_NAME_TEXT = 'L';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 200, CANVAS_HEIGHT / 8 + 220, "#ffcc66");
        

        horizontalplacer += 510;
        GAME_NAME_TEXT = '↑';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 65, CANVAS_HEIGHT / 8 + 100, "#fc66ff");
        GAME_NAME_TEXT = '←';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer - 65, CANVAS_HEIGHT / 8 + 220, "#fc66ff");
        GAME_NAME_TEXT = '↓';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 65, CANVAS_HEIGHT / 8 + 220, "#fc66ff");
        GAME_NAME_TEXT = '→';
        drawStrokedText(canvas, GAME_NAME_TEXT, horizontalplacer + 200, CANVAS_HEIGHT / 8 + 220, "#fc66ff");
        
        let vertspacer = 450;
        GAME_NAME_TEXT = 'Player with the blue ink trail is "IT"!';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2 , CANVAS_HEIGHT / 8 + vertspacer, "#FF0");
      
        vertspacer += 50;

        GAME_NAME_TEXT = '"IT" chases other players and tags them for big points.';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + vertspacer, "#FF0");
        vertspacer += 50;
        GAME_NAME_TEXT = 'Whoever gets tagged becomes the new "IT" and is stunned for 5 seconds.';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + vertspacer, "#FF0");
      

        vertspacer += 50;
        GAME_NAME_TEXT = 'Other players get points by running, hiding and gathering powerups!';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + vertspacer, "#FF0");

        vertspacer += 50;
        GAME_NAME_TEXT = 'Players can blend into the background by standing still.';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + vertspacer, "#FF0");

        vertspacer += 50;
        GAME_NAME_TEXT = 'The player with the most amount of points at the end, wins!';
        gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
        drawStrokedText(canvas, GAME_NAME_TEXT, CANVAS_WIDTH / 2 - gameTextx / 2, CANVAS_HEIGHT / 8 + vertspacer, "#FF0");
  
      
      }
     
}