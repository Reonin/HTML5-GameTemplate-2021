const trailPatternG = Sprite('greenTile');
const trailPatternB = Sprite('blueTile');

export default function drawTrail(){
    window.playerArray.forEach(p => {
        p.traveltrail.forEach( coord => {
            // trailSquare.draw(canvas, coord.x, coord.y, 60, 60);
            if(p.isIt){
                trailPatternB.draw(canvas, coord.x, coord.y);
            }else{
                trailPatternG.draw(canvas, coord.x, coord.y);
            }
            


        })
        
    });

}