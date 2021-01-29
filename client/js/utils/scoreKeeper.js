export default function trackScore(){
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