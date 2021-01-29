const socket = new WebSocket('ws://localhost:3000');

export default function sendData(player, x, y){
    
    var msg = {
        type: "message",
        player: player,
        x:   x,
        y: y
      };

      socket.onopen = function(event) {
          socket.send(JSON.stringify(msg));
      }
}