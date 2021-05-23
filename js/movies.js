class Movie {
	constructor(
		title, restOfTitle, actor1, actor2, videoId,
		mainBg, h1Bg, footerBg, linkColor // arrays of hsl values
	) {
		this.videoId = videoId;
		this.html = {
			title:	[ title, restOfTitle ],
			actors:	[ actor1, actor2 ]
		}
		this.colors = {
			main:	mainBg,
			h1:		h1Bg,
			footer:	footerBg,
			link:	linkColor
		}
	}
}


// title				first half if long
// rest of title		empty string if none
// actors				2 main actors
// video id				url query param
// main background		any color (contrast snack icons)
// title background		light color
// footer background	dark color (contrast heart icon)
// link color			light color

const movieData = [
	new Movie(
		"Addams Family Values", "",
		"Anjelica Huston", "Christina Ricci",
		"EisokUNMfeA",
		["240", "12%", "11%"], ["283", "31%", "48%"],
		["269", "46%", "29%"], ["14", "26%", "62%"]
	),

	new Movie(
		"Angry Indian", "Goddesses",
		"Sarah-Jane Dias", "Sandhya Mridul",
		"dIdxxvph-Vw",
		["0", "65%", "46%"], ["42", "86%", "72%"],
		["21", "100%"," 5%"], ["35", "94%", "69%"]
	),

	new Movie(
		"A Quiet Place", "",
		"Emily Blunt", "John Krasinski",
		"p9wE8dyzEJE",
		["133", "10%", "34%"], ["35", "23%", "56%"],
		["193", "16%", "11%"], ["357", "31%", "50%"]
	),

	new Movie(
		"Arrival", "",
		"Amy Adams", "Jeremy Renner",
		"ZLO4X6UI8OY",
		["233"," 4%", "59%"], ["21", "79%", "60%"],
		["184", "13%", "23%"], ["32", "59%", "81%"]
	),

	new Movie(
		"Back to the Future", "",
		"Michael J. Fox", "Christopher Lloyd",
		"qvsgGtivCgs",
		["9", "78%", "33%"], ["37", "77%", "50%"],
		["240", "33%", "21%"], ["37", "90%", "51%"]
	),

	new Movie(
		"Back to the Future", "Part II",
		"Michael J. Fox", "Christopher Lloyd",
		"MdENmefJRpw",
		["19", "64%", "43%"], ["47", "77%", "57%"],
		["208", "38%", "27%"], ["36", "71%", "60%"]
	),

	new Movie(
		"Black Panther", "",
		"Chadwick Boseman", "Michael B. Jordan",
		"xjDjIWPwcPU",
		["268", "66%", "37%"], ["207", "79%", "47%"],
		["240", "26%", "5%"], ["48", "68%", "67%"]
	),

	new Movie(
		"Brave", "",
		"Kelly Macdonald", "Emma Thompson",
		"TEHWDA_6e3M",
		["194", "96%", "37%"], ["25", "80%", "51%"],
		["147", "90%", "12%"], ["24", "82%", "65%"]
	),

	new Movie(
		"But I'm a", "Cheerleader",
		"Natasha Lyonne", "Clea DuVall",
		"HnUvneNxoz8",
		["335", "66%", "58%"], ["233", "46%", "68%"],
		["214", "68%", "27%"], ["14", "89%", "67%"]
	),

	new Movie(
		"Carol", "",
		"Cate Blanchett", "Rooney Mara",
		"EH3zcuRQXNo",
		["32", "53%", "31%"], ["41", "74%", "65%"],
		["172", "91%", "13%"], ["36", "66%", "61%"]
	),

	new Movie(
		"Confessions of a", "Shopaholic",
		"Isla Fisher", "Hugh Dancy",
		"d-jE5WJ7J28",
		["350", "80%", "51%"], ["167", "100%", "37%"],
		["120", "31%", "37%"], ["32", "96%", "63%"]
	),

	new Movie(
		"Easy A", "",
		"Emma Stone", "Amanda Bynes",
		"KNbPnqyvItk",
		["154", "28%", "33%"], ["43", "67%", "57%"],
		["17", "46%", "27%"], ["358", "84%", "59%"]
	),

	new Movie(
		"Get Out", "",
		"Daniel Kaluuya", "Allison Williams",
		"DzfpyUB60YY",
		["224", "43%", "30%"], ["257", "37%", "96%"],
		["206", "14%", "10%"], ["40", "78%", "75%"]
	),

	new Movie(
		"Gone Girl", "",
		"Rosamund Pike", "Ben Affleck",
		"2-_-1nJf8Vg",
		["184", "14%", "53%"], ["44", "17%", "61%"],
		["216", "24%", "26%"], ["72"," 2%", "58%"]
	),

	new Movie(
		"Harry Potter", "and the Philosopher's Stone",
		"Daniel Radcliffe", "Emma Watson",
		"PbdM1db3JbY",
		["352", "68%", "37%"], ["40", "82%", "55%"],
		["208", "23%", "11%"], ["41", "93%", "71%"]
	),

	new Movie(
		"Harry Potter", "and the Chamber of Secrets",
		"Daniel Radcliffe", "Emma Watson",
		"NPdCD_QYoMs",
		["170", "43%", "25%"], ["51", "68%", "50%"],
		["148", "60%", "12%"], ["163", "95%", "84%"]
	),

	new Movie(
		"Harry Potter", "and the Prisoner of Azkaban",
		"Daniel Radcliffe", "Emma Watson",
		"1ZdlAg3j8nI",
		["182", "28%", "36%"], ["41", "46%", "68%"],
		["207", "44%", "15%"], ["224", "10%", "72%"]
	),

	new Movie(
		"High School Musical", "",
		"Zac Efron", "Vanessa Hudgens",
		"yE07FbWmew8",
		["13", "79%", "60%"], ["49", "92%", "60%"],
		["359", "97%", "27%"], ["49", "83%", "79%"]
	),

	new Movie(
		"High School Musical 2", "",
		"Zac Efron", "Vanessa Hudgens",
		"k-t4vqd534Y",
		["197", "92%", "45%"], ["47", "91%", "57%"],
		["339", "63%", "41%"], ["45", "88%", "66%"]
	),

	new Movie(
		"High School Musical 3:", "Senior Year",
		"Zac Efron", "Vanessa Hudgens",
		"6R-JzVDt30k",
		["3", "85%", "33%"], ["35", "42%", "91%"],
		["25", "29%", "15%"], ["48", "98%", "66%"]
	),

	new Movie(
		"Incendies", "",
		"Lubna Azabal", "Mélissa Désormeaux-Poulin",
		"XJ69WnwvZhE",
		["358", "74%", "45%"], ["27", "66%", "73%"],
		["355", "83%", "16%"], ["29", "35%", "72%"]
	),

	new Movie(
		"Inglourious Basterds", "",
		"Brad Pitt", "Mélanie Laurent",
		"qRYDNWXuip8",
		["41", "59%", "84%"], ["359", "64%", "50%"],
		["147"," 8%", "27%"], ["35", "66%", "56%"]
	),

	new Movie(
		"Jurassic Park", "",
		"Sam Neil", "Laura Dern",
		"QWBKEmWWL38",
		["28", "33%", "22%"], ["5", "98%", "50%"],
		["106", "27%", "16%"], ["43", "79%", "52%"]
	),

	new Movie(
		"Le Fabuleux Destin", "d'Amélie Poulain",
		"Audrey Tautou", "Mathieu Kassovitz",
		"2UT5xaAfxWU",
		["105", "64%", "21%"], ["50", "95%", "51%"],
		["192"," 9%", "10%"], ["52", "94%", "81%"]
	),

	new Movie(
		"Legally Blonde", "",
		"Reese Witherspoon", "Moonie",
		"vWOHwI_FgAo",
		["346", "92%", "68%"], ["41", "94%", "55%"],
		["292", "51%", "32%"], ["49", "89%", "68%"]
	),

	new Movie(
		"Les Choristes", "",
		"Gérard Jugnot", "Jean-Baptiste Maunier",
		"qhYtVMoWFNQ",
		["42", "71%", "82%"], ["36", "53%", "62%"],
		["25", "27%", "18%"], ["36", "58%", "71%"]
	),

	new Movie(
		"Mamma Mia!", "",
		"Amanda Seyfried", "Meryl Streep",
		"QRoWiTcO7dk",
		["200", "76%", "67%"], ["228", "20%", "90%"],
		["230", "33%", "35%"], ["324", "45%", "69%"]
	),

	new Movie(
		"Matilda", "",
		"Mara Wilson", "Embeth Davidtz",
		"hUGHWje7liM",
		["213", "56%", "34%"], ["356", "73%", "59%"],
		["143", "35%", "38%"], ["61", "64%", "57%"]
	),

	new Movie(
		"Mean Girls", "",
		"Lindsay Lohan", "Rachel McAdams",
		"oDU84nmSDZY",
		["243", "13%", "73%"], ["320", "78%", "44%"],
		["306", "90%", "24%"], ["348", "60%", "80%"]
	),

	new Movie(
		"Memento", "",
		"Guy Pearce", "Carrie-Anne Moss",
		"4CV41hoyS8A",
		["50", "66%", "61%"], ["49", "43%", "85%"],
		["14", "39%", "35%"], ["45", "17%", "72%"]
	),

	new Movie(
		"Moana", "",
		"Auli'i Cravalho", "Dwayne Johnson",
		"cPAbx5kgCJo",
		["186", "82%", "47%"], ["15", "95%", "67%"],
		["19", "30%", "16%"], ["81", "43%", "52%"]
	),

	new Movie(
		"Moonlight", "",
		"Trevante Rhodes", "André Holland",
		"9NJj12tJzqc",
		["256", "27%", "34%"], ["184", "77%", "39%"],
		["223", "46%", "23%"], ["189", "60%", "64%"]
	),

	new Movie(
		"Mulan", "",
		"Ming-Na Wen", "BD Wong",
		"TVcLIfSC4OE",
		["1", "81%", "33%"], ["43", "98%", "50%"],
		["235", "40%", "24%"], ["52", "100%", "65%"]
	),

	new Movie(
		"Parasite", "",
		"Song Kang-ho", "Cho Yeo-jeong",
		"5xH0HfJHsaY",
		["101", "27%", "60%"], ["138", "29%", "93%"],
		["137", "59%", "21%"], ["39", "48%", "79%"]
	),

	new Movie(
		"Roma", "",
		"Yalitza Aparicio", "Marina de Tavira",
		"6BS27ngZtxg",
		["0", "0%", "39%"], ["48", "82%", "49%"],
		["0", "0%", "19%"], ["60"," 1%", "63%"]
	),
	
	new Movie(
		"Shrek", "",
		"Mike Myers", "Cameron Diaz",
		"CwXOrWvPBPk",
		["120", "98%", "23%"], ["64", "81%", "59%"],
		["157", "87%", "12%"], ["64", "71%", "51%"]
	),

	new Movie(
		"Spider-Man:", "Into the Spider-Verse",
		"Shameik Moore", "Jake Johnson",
		"ii3n7hYQOl4",
		["1", "100%", "42%"], ["198", "53%", "68%"],
		["155", "22%", "19%"], ["243", "39%", "78%"]
	),

	new Movie(
		"Spy Kids", "",
		"Alexa Vega", "Daryl Sabara",
		"GE5aHKJp6HI",
		["29", "86%", "69%"], ["48", "18%", "72%"],
		["1", "68%", "36%"], ["29", "91%", "70%"]
	),

	new Movie(
		"Spy Kids 2:", "The Island of Lost Dreams",
		"Alexa Vega", "Daryl Sabara",
		"8tTJ7kMgANg",
		["15", "81%", "58%"], ["56", "10%", "69%"],
		["355", "51%", "30%"], ["43", "93%", "66%"]
	),

	new Movie(
		"The Devil", "Wears Prada",
		"Anne Hathaway", "Meryl Streep",
		"6ZOZwUQKu3E",
		["69", "33%", "89%"], ["10", "99%", "43%"],
		["224", "46%", "31%"], ["36", "37%", "74%"]
	),

	new Movie(
		"The Martian", "",
		"Matt Damon", "Jessica Chastain",
		"ej3ioOneTy8",
		["25", "63%", "41%"], ["42", "74%", "55%"],
		["8", "83%", "26%"], ["35", "76%", "72%"]
	),

	new Movie(
		"The Truman Show", "",
		"Jim Carrey", "Laura Linney",
		"dlnmQbPGuls",
		["208", "50%", "54%"], ["300"," 1%", "67%"],
		["71", "21%", "25%"], ["214", "36%", "79%"]
	),

	new Movie(
		"West Side Story", "",
		"Natalie Wood", "Richard Beymer",
		"_e2igZexpMs",
		["3", "54%", "37%"], ["43", "62%", "86%"],
		["325", "29%", "12%"], ["297", "11%", "69%"]
	),
]