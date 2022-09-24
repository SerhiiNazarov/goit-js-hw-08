import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframeRef = document.querySelector('iframe');
const STORAGE_KEY = 'videoplayer-current-time';
const player = new Player(iframeRef);
initPage();
function onCurrentTime({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

player.on('timeupdate', throttle(onCurrentTime, 1000));

function initPage() {
  let saveData = localStorage.getItem(STORAGE_KEY);
  if (!saveData) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
}
initPage();
