export function trackScore(){
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

export function tallyPointTotal(){

    setTimeout(() => {
        window.currentState = window.states.END;
    }, 300000);

}