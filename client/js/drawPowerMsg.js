export default function drawPowerMsg(){
    
    if(window.powerMsg === "RED"){
        canvas.fillStyle = '#F00';
        canvas.font = 'bold 40pt Calibri';
        const SPACEBAR_TEXT = "Revealin' Red";
        const spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
        canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 6);
    }
    else if(window.powerMsg === "TEAL"){
        canvas.fillStyle = '#008080';
        canvas.font = 'bold 40pt Calibri';
        const SPACEBAR_TEXT = "Telportin' Teal";
        const spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
        canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 6);
    }
    else if(window.powerMsg === "DANDELION"){
        canvas.fillStyle = '#f0e130';
        canvas.font = 'bold 40pt Calibri';
        const SPACEBAR_TEXT = "Dashin' Dandelion";
        const spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
        canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 6);
    }
    else if(window.powerMsg === "LAVENDER"){
        canvas.fillStyle = '#E6E6FA';
        canvas.font = 'bold 40pt Calibri';
        const SPACEBAR_TEXT = "Lengthy Lavender";
        const spaceBarTextx = canvas.measureText(SPACEBAR_TEXT).width; // Centers the text based on length
        canvas.fillText(SPACEBAR_TEXT, (CANVAS_WIDTH / 2) - (spaceBarTextx / 2), CANVAS_HEIGHT - CANVAS_HEIGHT / 6);
    }
}

