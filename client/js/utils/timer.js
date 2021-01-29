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
  canvas.fillStyle = '#fff'; // Set color to black
  canvas.font = 'bold 40pt Calibri';
  const GAME_NAME_TEXT = window.timer;
  const gameTextx = canvas.measureText(GAME_NAME_TEXT).width; // Centers the text based on length
  canvas.fillText(
    GAME_NAME_TEXT,
    CANVAS_WIDTH - 100,
    40,
  );
}
