const trailPattern = Sprite('greenTile');


export default function drawTrail(){
    window.playerArray.forEach(p => {
        p.traveltrail.forEach( coord => {
            // trailSquare.draw(canvas, coord.x, coord.y, 60, 60);
            trailPattern.draw(canvas, coord.x, coord.y);
        })
        
    });

}