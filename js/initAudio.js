export {GameLoopMusic_sound, explosion_sound, shoot_sound };
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




