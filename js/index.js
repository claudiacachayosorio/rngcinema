// Youtube API call
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// Change background color
const mainElement = document.getElementById('main');
mainElement.style.transition = 'background 5s';

const darkenMainBg = () => mainElement.style.background = '#000';
const lightenMainBg = () => mainElement.style.background = '#aeaead';


// Event handler
function onPlayerStateChange(e) {
	switch(e.data) {
		case 1: //playing
		case 3: //buffering
			darkenMainBg();
			break;
		case 0: //ended
		case 2: //paused
			lightenMainBg();
			break;
	}
}


// Create player object
let player;
const playerParams = {
	height: '390',
	width: '640',
	videoId: 'ii3n7hYQOl4',
	events: {
		'onStateChange': onPlayerStateChange
	}
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', playerParams);
}