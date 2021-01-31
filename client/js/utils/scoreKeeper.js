export function trackScore(){

if(window.currentState === window.states.GAME){
    window.playerArray.forEach(p => {
        if(p.isIt){
            return
        }
        else{
            p.score(1);
        }
       
    });
    setTimeout(trackScore, 1000);

    }
}

export function tallyPointTotal(){

    setTimeout(() => {
        window.winners =  window.playerArray.sort((a, b) => a.score - b.score);

        window.currentState = window.states.END;
    }, 300000);

}