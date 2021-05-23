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

// ! hsl values get immediately converted to rgb in browser
const getDarkHSL = arr => getHSL([ arr[0], arr[1], '50%' ]);

function darkenMainBg() {
	const hsl = `hsl(${defaultArr[0]}, ${defaultArr[1]}, 50%)`
	//const darkHSL = getDarkHSL(defaultArr);
	mainElement.style.backgroundColor = hsl;
	console.log(main.style)
}

const lightenMainBg = () => mainElement.style.background = getHSL(defaultArr);

mainElement.onclick = darkenMainBg;
document.getElementById('footer').onclick = lightenMainBg;