// Youtube Player

// API call
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Generate IFrame
const playerParams = {
	height: '390',
	width: '640',
	videoId: 'ii3n7hYQOl4',
	playerVars: {
		'playsinline': 1
	}
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', playerParams);
}


// Darken main background

const defaultArr = ['60', '1%', '68%'];

function getHSL(arr) {
	return `hsl(${arr[0]}, ${arr[1]}, ${arr[2]})`;
}

const mainElement = document.getElementById('main');
mainElement.style.transition = 'background 5s';

const getDarkHSL = arr => getHSL([ arr[0], arr[1], '0%' ]);

function darkenMainBg(currentArr) {
	const darkHSL = getDarkHSL(currentArr);
	mainElement.style.background = darkHSL;
}

const lightenMainBg = currentArr => mainElement.style.background = getHSL(currentArr);