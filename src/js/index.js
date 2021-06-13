import { theme } from './theme.js';


// Youtube API call
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
console.log(tag);


// Event handler
const mainElement = document.querySelector('main');
const themeBg = `#${theme.colors[0]}`;

function onPlayerStateChange(e) {
	switch(e.data) {
		case 1: //playing
		case 3: //buffering
			mainElement.style.background = '#000';
			break;
		case 0: //ended
		case 2: //paused
			mainElement.style.background = themeBg;
			break;
	}
}


// Create player object
let player;
const playerParams = {
	height: '390',
	width: '640',
	videoId: theme.video,
	events: {
		'onStateChange': onPlayerStateChange
	}
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', playerParams);
	console.log(player);
}


// Letter board
function setHTML(arr) {
	const arrName = Object.keys(theme).find(k => k == arr);

	for (let i = 0; i < theme[arr].length; i++) {
		const id = `${arrName}-${i + 1}`;
		const element = document.getElementById(id);
		element.innerHTML = theme[arr][i];
	}
}

setHTML('title');
setHTML('actors');