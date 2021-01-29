

export default function positionCheck(me) {
    const whoseIt = window.playerArray.find(p => p.isIt == true);
    //You caught them
	if(me.x == whoseIt.x && me.y == whoseIt.y) {
		
	
    } //if you are the bad guy 
    else if(me.isIt == true){
        // vertical position
		if(me.y > whoseIt.y) {
			me.y--;
		} else if(me.y < whoseIt.y) {
			me.y++;
		}
		
		// horizontal position
		if(me.x > whoseIt.x) {
			me.x--;
		} else if(me.x < whoseIt.x) {
			me.x++;
		}
    }
    else { //Run from who is it
		// vertical position
		if(me.y > whoseIt.y) {
            //me.y++;
            me.AImovement("down")
		} else if(me.y < whoseIt.y) {
            //me.y--;
            me.AImovement("up")
		}
		
		// horizontal position
		if(me.x > whoseIt.x) {
            // me.x++;
            me.AImovement("right")
		} else if(me.x < whoseIt.x) {
            //me.x--;
            me.AImovement("left")
		}
	}
}
