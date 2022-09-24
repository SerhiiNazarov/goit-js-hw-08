import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const STORAGE_KEY = 'videoplayer-current-time';
const player = new Player('vimeo-player', {
  id: 'vimeo-player',
  width: 640,
});

function onCurrentTime(currentTime) {
  const curTime = JSON.stringify(currentTime.seconds);
  localStorage.setItem(STORAGE_KEY, curTime);
}

player.on('timeupdate', throttle(onCurrentTime, 1000));

player
  .setCurrentTime(localStorage.getItem(STORAGE_KEY))
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'the time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        break;
    }
  });
