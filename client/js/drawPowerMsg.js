export default function drawPowerMsg(){
   const btmLeftMargin = 40; 
   const centerBtmTextHeight = CANVAS_HEIGHT - 20;
    if(window.powerMsg === "RED"){
        drawWhiteBGCard();
        canvas.fillStyle = '#F00';
        canvas.font = 'black 30pt Roboto';
        const SPACEBAR_TEXT = "Revealin' Red";
        canvas.fillText(SPACEBAR_TEXT, btmLeftMargin, centerBtmTextHeight );
        //Descriptor
        drawBlackDescriptor("See the entire map",375,centerBtmTextHeight)

    }
    else if(window.powerMsg === "TEAL"){
        drawWhiteBGCard();
        canvas.fillStyle = '#008080';
        canvas.font = 'black 30pt Roboto';
        const SPACEBAR_TEXT = "Teleportin' Teal";
        canvas.fillText(SPACEBAR_TEXT, btmLeftMargin, centerBtmTextHeight );
        //Descriptor
        drawBlackDescriptor("Sends you back to center",450,centerBtmTextHeight)
    }
    else if(window.powerMsg === "DANDELION"){
        drawWhiteBGCard();
        canvas.fillStyle = '#f0e130';
        canvas.font = 'black 30pt Roboto';
        const SPACEBAR_TEXT = "Dashin' Dandelion";
        canvas.fillText(SPACEBAR_TEXT, btmLeftMargin, centerBtmTextHeight );
        //Descriptor
        drawBlackDescriptor("Increase Speed",500,centerBtmTextHeight)
    }
    else if(window.powerMsg === "LAVENDER"){
        drawWhiteBGCard();
        canvas.fillStyle = '#E6E6FA';
        canvas.font = 'black 30pt Roboto';
        const SPACEBAR_TEXT = "Lengthy Lavender";
        canvas.fillText(SPACEBAR_TEXT, btmLeftMargin, centerBtmTextHeight );
        //Descriptor
        drawBlackDescriptor("Increase paint trail",450,centerBtmTextHeight)
    }
    else if(window.powerMsg === "MAGENTA"){
        drawWhiteBGCard();
        canvas.fillStyle = '#FF00FF';
        canvas.font = 'black 30pt Roboto';
        const SPACEBAR_TEXT = "Multiplyin' Magenta";
        canvas.fillText(SPACEBAR_TEXT, btmLeftMargin, centerBtmTextHeight );
        //Descriptor
        drawBlackDescriptor("Double Point Generation",525,centerBtmTextHeight)
    }
    
}

function drawWhiteBGCard(){
  var botBarCenter = CANVAS_HEIGHT - 60;

  canvas.globalAlpha = 0.5;
  canvas.fillStyle = "#d8dce2";
  canvas.fillRect(0, botBarCenter, CANVAS_WIDTH, CANVAS_HEIGHT);
 

  canvas.globalAlpha = 1;
  canvas.textAlign = "left";
}

function drawBlackDescriptor(text,x,y){
    canvas.fillStyle = '#000';
    canvas.font = 'medium 30pt Roboto';
    canvas.fillText(text, x, y );
}