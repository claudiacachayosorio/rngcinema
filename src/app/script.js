// Letter board

function setHTML(arr) {
	// Get string of target array name
	const arrName = Object.keys(theme).find(k => k == arr);

	for (let i = 0; i < theme[arr].length; i++) {
		// Get div id by concatenating array name and current index + 1
		// example: array "title" & index 0 + 1 results to title-1
		const id = `${arrName}-${i + 1}`;
		// Get HTML element
		const div = document.getElementById(id);
		// Inject content of current array element to div
		div.innerHTML = theme[arr][i];
	}
}
setHTML('title');
setHTML('actors');


// IFrame player

// API call
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Change background depending on player state
const mainElement = document.querySelector('main');
const themeBg = theme.colors[0];

function onPlayerStateChange(e) {
	switch(e.data) {
		case 1: //playing
		case 3: //buffering
			// fade to black
			mainElement.style.background = '#000';
			break;
		case 0: //ended
		case 2: //paused
			// fade to initial color
			mainElement.style.background = themeBg;
			break;
	}
}

// Create player object
const playerParams = {
	height: '390',
	width: '640',
	videoId: theme.video,
	events: {
		'onStateChange': onPlayerStateChange
	}
}

let player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', playerParams);
}