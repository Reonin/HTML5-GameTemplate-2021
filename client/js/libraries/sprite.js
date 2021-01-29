(function () {
  function LoaderProxy() {
    return {
      draw: $.noop,
      fill: $.noop,
      frame: $.noop,
      update: $.noop,
      width: null,
      height: null,
    };
  }

  function Sprite(image, sourceX, sourceY, width, height) {
    sourceX = sourceX || 0;
    sourceY = sourceY || 0;
    width = width || image.width;
    height = height || image.height;

    return {
      draw(canvas, x, y) {
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

  Sprite.load = function (url, loadedCallback) {
    const img = new Image();
    const proxy = LoaderProxy();

    img.onload = function () {
      const tile = Sprite(this);

      $.extend(proxy, tile);

      if (loadedCallback) {
        loadedCallback(proxy);
      }
    };

    img.src = url;

    return proxy;
  };

  const spriteImagePath = 'images/';

  window.Sprite = function (name, callback) {
    return Sprite.load(`${spriteImagePath + name}.png`, callback);
  };
  window.Sprite.EMPTY = LoaderProxy();
  window.Sprite.load = Sprite.load;
}());
