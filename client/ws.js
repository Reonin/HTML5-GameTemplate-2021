

export default function sendData(msgBlob){
    
    // var msg = {
    //     type: "message",
    //     player: player,
    //     x:   x,
    //     y: y
    //   };

    //console.log(`socket is ${window.socket.url}`);
    return new Promise(function(resolve, reject) { 
        
    //   window.socket.onopen = function(event) {
        //console.log(`The websocket msg: ${JSON.stringify(msgBlob)}`);
        window.socket.send(msgBlob);
          resolve('Message sent successfully');
        //   window.socket.close()
    //   };
      window.socket.onerror = function(err) {
        reject(err);
    };
    });
}