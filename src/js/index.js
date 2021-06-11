//const movie = require('./theme.js');

// Youtube API call
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// Event handler
const mainElement = document.querySelector('main');
// const currBg = movie.colors[0];

function onPlayerStateChange(e) {
	switch(e.data) {
		case 1: //playing
		case 3: //buffering
			mainElement.style.background = '#000';
			break;
		case 0: //ended
		case 2: //paused
			mainElement.style.background = '#aeaead';
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



// Letter board

/*
function setHTML(arr) {
	for (i = 0; i < movie[arr].length; i++) {
		const name = Object.keys(movie).find(k => k == arr);
		const id = `${name}-${i + 1}`;
		const element = document.getElementById(id);
		element.innerHTML = movie[arr][i];
	}
}
setHTML('title');
setHTML('actors');
*/