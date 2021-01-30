export { GameLoopMusic_sound, explosion_sound, shoot_sound, pickup_sound };
// Sound creation
const GameLoopMusic_sound = new Howl({
  src: ['sounds/lets not be bored .mp3'],
  autoplay: true,
  loop: true,
  volume: 0.2,
});

const explosion_sound = new Howl({
  src: ['sounds/explosion.mp3', 'sounds/explosion.wav'],
});

const shoot_sound = new Howl({
  src: ['sounds/shoot.mp3', 'sounds/shoot.wav'],
  volume: 0.2,
});

const pickup_sound = new Howl({
  src: ['sounds/pickupzing.mp3', 'sounds/pickupzing.wav'],
  volume: 0.2,
});

const splash_sound = new Howl({
  src: ['sounds/Water Splash 0.wav'],
  volume: 0.2,
})
