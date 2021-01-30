export default function drawTagMdg(){
    if (window.tagState === 'tagger') {
        canvas.fillStyle = '#F00';
        canvas.font = 'bold 40pt Calibri';
        const SPACEBAR_TEXT = 'YOU JUST TAGGED';
        const spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
        canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 4);
      } else if (window.tagState === 'tagged') {
        canvas.fillStyle = '#F00';
        canvas.font = 'bold 40pt Calibri';
        const SPACEBAR_TEXT = 'YOU GOT TAGGED';
        const spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
        canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 4);
      }
} 