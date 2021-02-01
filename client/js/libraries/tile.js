(function () {
  function LoaderProxy2() {
    return {
      draw: $.noop,
      fill: $.noop,
      frame: $.noop,
      update: $.noop,
      width: null,
      height: null,
    };
  }

  function Tile(image, sourceX, sourceY, width, height) {
    sourceX = sourceX || 0;
    sourceY = sourceY || 0;
    width = width || image.width;
    height = height || image.height;

    return {
      draw(canvas, x, y, width, height) {
        canvas.drawImage(
          image,
          sourceX,
          sourceY,
          width,
          height,
          x,
          y,
          width,
          height,
        );
      },

      fill(canvas, x, y, width, height, repeat) {
        repeat = repeat || 'repeat';
        const pattern = canvas.createPattern(image, repeat);
        canvas.fillColor(pattern);
        canvas.fillRect(x, y, width, height);
      },

      width,
      height,
    };
  }

  Tile.load = function (url, loadedCallback) {
    const img = new Image();
    const proxy = LoaderProxy2();

    img.onload = function () {
      const tile = Tile(this);

      $.extend(proxy, tile);

      if (loadedCallback) {
        loadedCallback(proxy);
      }
    };

    img.src = url;

    return proxy;
  };

  const spriteImagePath = '../client/images/';

  window.Tile = function (name, callback) {
    return Tile.load(`${spriteImagePath + name}.png`, callback);
  };
  window.Tile.EMPTY = LoaderProxy2();
  window.Tile.load = Tile.load;
}());
