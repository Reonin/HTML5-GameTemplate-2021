const trailPatternG = Sprite('greenCircle');
const trailPatternB = Sprite('blueCircle');

export default function drawTrail(){
    window.playerArray.forEach(p => {
        p.traveltrail.forEach( coord => {
            // trailSquare.draw(canvas, coord.x, coord.y, 60, 60);

           if(p.activePuddle){
            if(p.isIt){
                trailPatternB.draw(canvas, coord.x, coord.y);
            }else{
                trailPatternG.draw(canvas, coord.x, coord.y);
            }
           } 
        
            


        })
        
    });

}