export default function scaletosmallest(canvasElement, ratio) {
  /** By Ryan Giglio */
  if ((window.innerWidth / ratio) <= window.innerHeight) {
    canvasElement.style.width = '100%';
    canvasElement.style.height = 'auto';
  } else {
    canvasElement.style.height = '100%';
    canvasElement.style.width = 'auto';
  }
}
