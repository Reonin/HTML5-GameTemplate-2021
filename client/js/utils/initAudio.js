export { GameLoopMusic_sound, explosion_sound, shoot_sound, pickup_sound };
// Sound creation
const GameLoopMusic_sound = new Howl({
  src: ['sounds/In-Orbit.mp3'],
  autoplay: false,
  loop: true,
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
