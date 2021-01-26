export default function scaletosmallest(canvasElement, ratio) {
  if ( ($(window).width() / ratio) <= $(window).width() ) {
    canvasElement.style.width = '100%';
    canvasElement.style.height = 'auto';
  } else {
    canvasElement.style.height = '100%';
    canvasElement.style.width = 'auto';
  }
}
