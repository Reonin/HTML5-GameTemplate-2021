/** * Parallax background tutorial http://javacoffee.de/?p=866 * */
// Parallax background

/**
    * Data structure to hold layer data
    * @param s <string> Absolute path to the image
    * @param x <int> X coordinate
    * @param Y </int><int> Y coordinate
    */
function Layer(s, x, y) {
  this.img = new Image();
  this.img.src = s;
  this.x = x;
  this.y = y;
}
/**
 * Main ParallaxScrolling class
 * @param ctx <context> Canvas context
 * @param imgdata <array> Array with absolute image paths
 */
export default function ParallaxScrolling(canvas, imgdata) {
  const self = this;
  if (typeof imgdata === 'undefined') {
    imgdata = []; // fill it with paths to images for the parralax
  }
  this.canvas = canvas;

  // Initialize the layers
  this.layers = new Array(imgdata.length);
  for (let i = 0; i < imgdata.length; i++) {
    this.layers[i] = new Layer(imgdata[i], 0, 0);
  }

  // Function: Move all layer except the first one
  this.Move = () => {
    for (let i = 1; i < self.layers.length; i++) {
      if (self.layers[i].x > self.layers[i].img.width) self.layers[i].x = 0;
      self.layers[i].x += i;
    }
  };

  // Function: Draw all layer in the canvas
  this.Draw = () => {
    self.Move();
    for (let i = 0; i < self.layers.length; i++) {
      const x1 = (self.layers[i].x - self.layers[i].img.width);
      self.canvas.drawImage(
        self.layers[i].img,
        0, 0,
        self.layers[i].img.width,
        self.layers[i].img.height,
        self.layers[i].x, 0,
        self.layers[i].img.width,
        self.layers[i].img.height,
      );
      self.canvas.drawImage(
        self.layers[i].img,
        0, 0,
        self.layers[i].img.width,
        self.layers[i].img.height,
        x1, 0,
        self.layers[i].img.width,
        self.layers[i].img.height,
      );
    }
  };
}
