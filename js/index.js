// Youtube Player

// API call
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Create player object
let player;
const playerParams = {};

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', playerParams);
	console.log(playerParams);
}


// Darken main background

const defaultArr = ['60', '1%', '68%'];

function getHSL(arr) {
	return `hsl(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

const mainElement = document.getElementById('main');
mainElement.style.transition = 'background 5s';

const darkenMainBg = () => mainElement.style.background = '#000';

const lightenMainBg = () => mainElement.style.background = getHSL(defaultArr);