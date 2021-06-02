// Youtube API call
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// Change background color

// ! replace bg variable with current one from lambda function
const defaultBg = '#e6c29e';

const mainElement = document.getElementById('main');
mainElement.style.transition = 'background 5s';

const darkenMainBg = () => mainElement.style.background = '#000';
const lightenMainBg = () => mainElement.style.background = defaultBg;


// Event handler
function onPlayerStateChange(e) {
	const state = e.data;
	switch(state) {
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
const iframeId = 'player';
const playerParams = {
	events: { 'onStateChange': onPlayerStateChange }
};

function onYouTubeIframeAPIReady() {
	player = new YT.Player(iframeId, playerParams);
}