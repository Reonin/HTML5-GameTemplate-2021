export default function drawPlayerUI() {
  const hudBar2Slide = 680;
  const hudBar3Slide = 1300;
  // Player 1

  canvas.fillStyle = '#fff'; // Set color to black
  canvas.font = 'bold 20pt Calibri';
  canvas.fillText('Player 1', 20, 25);

  canvas.fillStyle = '#fff'; // Set color to black
  canvas.font = '20pt Calibri';
  canvas.fillText(`Score:${player.pointScore}`, 115, 25);

  // Life Bar top is pink static background
  // canvas.strokeRect(20, 40, 100 * 2, 10);
  // canvas.fillStyle = "#8B8989";
  // canvas.fillRect(20, 40, 100 * 2, 10);

  // //Second bar is red dynamic one
  // canvas.strokeRect(20, 40, 100 * 2, 10);
  // canvas.fillStyle = "#F00";
  // canvas.fillRect(20, 40, player.life * 2, 10);

  // Player 2

  canvas.fillStyle = '#00f'; // Set color to black
  canvas.font = 'bold 20pt Calibri';
  canvas.fillText('Player 2', hudBar2Slide, 25);

  canvas.fillStyle = '#fff'; // Set color to black
  canvas.font = '20pt Calibri';
  canvas.fillText(`Score:${player2.pointScore}`, hudBar2Slide + 115, 25);

  // Life Bar top is pink static background
  // canvas.strokeRect(hudBar2Slide, 40, 100 * 2, 10);
  // canvas.fillStyle = "#8B8989";
  // canvas.fillRect(hudBar2Slide, 40, 100 * 2, 10);

  // //Second bar is red dynamic one
  // canvas.strokeRect(hudBar2Slide, 40, 100 * 2, 10);
  // canvas.fillStyle = "#F00";
  // canvas.fillRect(hudBar2Slide, 40, player2.life * 2, 10);

  // Player 3
  canvas.fillStyle = '#F00'; // Set color to black
  canvas.font = 'bold 20pt Calibri';
  canvas.fillText('Player 3', hudBar3Slide, 25);

  canvas.fillStyle = '#fff'; // Set color to black
  canvas.font = '20pt Calibri';
  canvas.fillText(`Score:${player3.pointScore}`, hudBar3Slide + 115, 25);

  // Life Bar top is pink static background
  // canvas.strokeRect(hudBar3Slide, 40, 100 * 2, 10);
  // canvas.fillStyle = "#8B8989";
  // canvas.fillRect(hudBar3Slide, 40, 100 * 2, 10);

  // //Second bar is red dynamic one
  // canvas.strokeRect(hudBar3Slide, 40, 100 * 2, 10);
  // canvas.fillStyle = "#F00";
  // canvas.fillRect(hudBar3Slide, 40, player3.life * 2, 10);
}
