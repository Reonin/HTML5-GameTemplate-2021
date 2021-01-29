import { countdownTimer } from './utils/timer.js'

export default function transferTag(player, otherPlayer) {
  if (player.isIt === true && otherPlayer.isImmune === false) {
    console.log('P1 Tagged P2');
    player.isIt = false;
    otherPlayer.isIt = true;
    player.score(100);
    thingsForBoth(player,otherPlayer);
    changePlayerSpeed(player,otherPlayer);
  } else if (otherPlayer.isIt === true && player.isImmune === false) {
    console.log('P2 Tagged P1');
    otherPlayer.isIt = false;
    player.isIt = true;
    otherPlayer.score(100);
    thingsForBoth(player,otherPlayer);
    changePlayerSpeed(otherPlayer,player);
  }
}

function thingsForBoth(player, otherPlayer){
  // make both immune
  player.isImmune = true;
  otherPlayer.isImmune = true;
  countdownTimer(removeImmunityforAll);
}

function removeImmunityforAll(){
  window.playerArray.forEach(p => {
    p.isImmune = false;
  });
}

function changePlayerSpeed(tagger, tagged){
  tagger.speed = 8;
  tagged.speed = 0;
  countdownTimer(restoreSpeed);
}

function restoreSpeed(){
  window.playerArray.forEach(p => {
    p.speed = 4;
  })
}

