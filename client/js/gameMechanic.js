export default function transferTag(player, otherPlayer) {
  if (player.isIt === true && otherPlayer.isImmune === false) {
    console.log('P1 Tagged P2');
    player.isIt = false;
    otherPlayer.isIt = true;
    // make both immune
    player.isImmune = true;
    otherPlayer.isImmune = true;
  } else if (otherPlayer.isIt === true && player.isImmune === false) {
    console.log('P2 Tagged P1');
    otherPlayer.isIt = false;
    player.isIt = true;
    // make both immune
    player.isImmune = true;
    otherPlayer.isImmune = true;
  }
}
