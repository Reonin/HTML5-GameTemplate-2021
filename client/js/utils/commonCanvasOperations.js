export function writeMessage(message) {
  const context = canvasid.getContext('2d');
  context.clearRect(0, 0, canvasid.width, canvasid.height);
  context.font = '18pt Calibri';
  context.fillStyle = 'white';
  context.fillText(message, 10, 25);
  // console.log(message);
}

export function drawImageRotated(img, x, y, rot) {
    const context = canvasid.getContext('2d');
    context.setTransform(1, 0, 0, 1, x, y); // set the scale and the center pos
    context.rotate(rot); // set the rotation
    context.drawImage(img, -img.width / 2, -img.height / 2); // draw image offset
  // by half its width
  // and heigth
  context.setTransform(1, 0, 0, 1, 0, 0); // restore default transform
}
