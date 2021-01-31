import {drawStrokedText} from './commonCanvasOperations.js';

export function startTimer() {
  const presentTime = window.timer;
  const timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  const s = checkSecond((timeArray[1] - 1));
  if (s == 59) { m -= 1; }
  // if(m<0){alert('timer completed')}

  window.timer = `${m}:${s}`;
 // console.log(m);
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) { sec = `0${sec}`; } // add zero in front of numbers < 10
  if (sec < 0) { sec = '59'; }
  return sec;
}

export function drawTimer() {

  canvas.font = 'bold 40pt Calibri';
  const GAME_NAME_TEXT = window.timer;
  drawStrokedText(canvas,GAME_NAME_TEXT, CANVAS_WIDTH - 100, 40, '#fff');

}

export function countdownTimer(doTheThing, doItWhen = 5000){
  setTimeout(function() {
    doTheThing();
}, doItWhen);
}