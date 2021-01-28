// Keyboard Map
export function setUpKeys() {
    window.keydown = {};
    window.keyup = {};
  
    function keyName(event) {
      return jQuery.hotkeys.specialKeys[event.which]
                 || String.fromCharCode(event.which).toLowerCase();
    }
  
    $(document).bind('keydown', (event) => {
      keydown[keyName(event)] = true;
    });
  
    $(document).bind('keyup', (event) => {
      keydown[keyName(event)] = false;
    });
  }