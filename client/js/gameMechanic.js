import { countdownTimer } from './utils/timer.js';

export function transferTag(player, otherPlayer) {
  if (player.isIt === true && otherPlayer.isImmune === false) {
    //console.log('P1 Tagged P2');
    player.isIt = false;
    otherPlayer.isIt = true;
    if (Object.is(window.player, player)) {
      hudRenderTagged('tagger');
    }
    player.score(100);
    thingsForBoth(player, otherPlayer);
    changePlayerSpeed(player, otherPlayer);
  } else if (otherPlayer.isIt === true && player.isImmune === false) {
    //console.log('P2 Tagged P1');
    otherPlayer.isIt = false;
    player.isIt = true;
    if (Object.is(window.player, player)) {
      hudRenderTagged('tagged');
    }
    otherPlayer.score(100);
    thingsForBoth(player, otherPlayer);
    changePlayerSpeed(otherPlayer, player);
  }
}

function thingsForBoth(player, otherPlayer) {
  // make both immune
  player.isImmune = true;
  otherPlayer.isImmune = true;
  countdownTimer(removeImmunityforAll);
}

function removeImmunityforAll() {
  window.playerArray.forEach((p) => {
    p.isImmune = false;
  });
}

function changePlayerSpeed(tagger, tagged) {
  tagger.speed = 8;
  tagged.speed = 0;
  countdownTimer(restoreSpeed);
}

function restoreSpeed() {
  window.playerArray.forEach((p) => {
    p.isIt ? p.speed = 6 : p.speed = 4; // make sure you update camera buffer to factor in the speed
  });
}

function hudRenderTagged(state) {
  if (state === 'tagger') {
    window.tagState = 'tagger';
    setTimeout(() => {
      window.tagState = null;
    }, 5000);
  } else if (state === 'tagged') {
    window.tagState = 'tagged';
    setTimeout(() => {
      window.tagState = null;
    }, 5000);
  }
}


export function colorWheelRoulette(whichPlayer){

 let spin = Math.floor(Math.random() * 5);
  switch (spin) {
    case 0:
      //REVEALING RED
      window.cameraFollow = false;
      window.powerMsg = "RED";
      setTimeout(() => {
        window.cameraFollow = true;
        window.powerMsg = null;
      }, 15000);
      break;
    case 1:
      //Teleportin Teal
      whichPlayer.x = 988;
      whichPlayer.y = 480 ;
      window.powerMsg = "TEAL";
      setTimeout(() => {
        window.powerMsg = null;
      }, 15000);
      break;
    case 2:
      //Dashin' Dandelion
      whichPlayer.speed *= 2;
      window.powerMsg = "DANDELION";
      setTimeout(() => {
        whichPlayer.isIt ? whichPlayer.speed = 6 : whichPlayer.speed = 4;
        window.powerMsg = null;
      }, 15000);
      break;
    case 3:
      //Lengthy Lavender
      window.playerArray.forEach(p => {
        p.trailCap = 50;
      })

      window.powerMsg = "LAVENDER";
      setTimeout(() => {
        window.playerArray.forEach(p => {
          p.trailCap = 20;
        })
        window.powerMsg = null;
      }, 15000);
      break;
    case 4:
      //Multiplyin' Magenta
      whichPlayer.pointMultiplier = 2;
      window.powerMsg = "MAGENTA";
      setTimeout(() => {
        whichPlayer.pointMultiplier = 1;
        window.powerMsg = null;
      }, 15000);
      break;

      
    
  }



}