var menuShowing = false;
var menuBG = null;
function drawTexts(songs) {
	//getTextLength("");
}
var botSelected = true;
async function menu() {
	var menuA = await renderer.createImage(loadUrl("./assets/images/menuBG.png","imgage/png"));
	var menuB = await renderer.createImage(loadUrl("./assets/images/menuBGMagenta.png","imgage/png"));
	menuBG = new Sprite(0,0,menuA,1286,730);
	addSprite(menuBG);
	//addSprite(bf);
	//addSprite(bf);
	menuShowing = true;
	window.currentBGM = "freakyMenu";
	var songs = JSON.parse(loadFile("./assets/songlist.json"));
	var selectedSong = 0; //0 is first item in song data.
	var texts = [];
	function waitForKeyPress() {
		return new Promise((accept) => {
			window.onkeydown = function (event) {
				accept(event.key);
			};
		})
	}
	var moveSound = new Audio(loadUrl("./assets/sounds/scrollMenu.ogg","audio/ogg"));
	var selectSound = new Audio(loadUrl("./assets/sounds/confirmMenu.ogg","audio/ogg"));
	async function openScreenSelect(options,name) {
		var x = await getTextLength(name,1.5)/2;
		var menuTextSprites = drawText(-x,-40,name,1.5);
		for (var s of menuTextSprites) {addSprite(s);}
		var selectIndex = 0;
		var selectOrBack = "none";
		var menuFinished = false;
		var key = null;
		var textSprites = [];
		while (menuShowing && !(menuFinished)) {
			await tickAsync();
			//console.log("key pressed");
			var timeoutcount = 0;
			while (timeoutcount < 1){
				await tickAsync();
				for (var s of textSprites) {removeSprite(s);}
				var x = await getTextLength(options[selectIndex],0.5)/2;
				textSprites = drawText(-x,0,options[selectIndex],0.5);
				for (var s of textSprites) {addSprite(s);}
				timeoutcount += 1;
			}
			key = await waitForKeyPress();
			if (key == window.keyBinds.menuleft) {
				selectIndex -= 1;
				moveSound.currentTime = 0;
				moveSound.play();
			}
			if (key == window.keyBinds.menuright) {
				selectIndex += 1;
				moveSound.currentTime = 0;
				moveSound.play();
			}
			if (key == window.keyBinds.confirm) {//space is an " ", (without the quotes) no joke!
				//selectIndex += 1;
				selectSound.currentTime = 0;
				selectSound.play();
				await waitAsync(0.1);
				menuBG.image = menuB;
				await waitAsync(0.1);
				menuBG.image = menuA;
				await waitAsync(0.1);
				menuBG.image = menuB;
				await waitAsync(0.1);
				menuBG.image = menuA;
				menuFinished = true;
				
			}
			if (options.length-1 < selectIndex) {
				selectIndex = options.length-1;
			}
			if (selectIndex < 0) {
				selectIndex = 0;
			}
		}
		var fadeCount = 100;
		if (menuShowing) {
			while (menuShowing && (fadeCount > 0)) {
				await tickAsync();
				for (var s of menuTextSprites) {s.trs = fadeCount/100;}
				for (var s of textSprites) {s.trs = fadeCount/100;}
				fadeCount -= 1;
			}
		}
		for (var s of menuTextSprites) {removeSprite(s);}
		for (var s of textSprites) {removeSprite(s);}
		return {
			selected:selectIndex,
			selectedText:options[selectIndex],
			pressed:selectOrBack
		};
	}
	var menuSelected = "main";
	while (menuShowing) {
		await tickAsync();
		if (menuSelected == "main") {
			var menuresponse = await openScreenSelect(["freeplay","options"],"main menu");
			if (menuresponse.selected == 0) {
				menuSelected = "freeplay";
			}
			if (menuresponse.selected == 1) {
				menuSelected = "options";
			}
		}
		if (menuSelected == "freeplay") {
			var menuresponse = await openScreenSelect(songs.freeplay.concat(["<go back>"]),"freeplay");
			if (menuresponse.selectedText == "<go back>") {
				menuSelected = "main";
			} else {
				menuShowing = false;
				openGame(menuresponse.selectedText,botSelected,menu);
			}
		}
		if (menuSelected == "options") {
			var menuresponse = await openScreenSelect([botSelected ? ("turn off botplay") : "turn on botplay","controls","erase data","<go back>"],"options");
			if (menuresponse.selectedText == "<go back>") {
				menuSelected = "main";
			}
			if (menuresponse.selected == 0) {
				botSelected = !(botSelected);
			}
			if (menuresponse.selected == 1) {
				if (window.isWebversion) {
					window.alert("save data is unavailible, in the web version");
				} else {
					window.location.replace("./keybindchanger/index.html");
				}
			}
			if (menuresponse.selected == 2) {
				if (window.isWebversion) {
					window.alert("save data is unavailible, in the web version");
				} else {
					menuSelected = "erasedataconfirm";
				}
			}
		}
		if (menuSelected == "erasedataconfirm") {
			var menuresponse = await openScreenSelect(["no","yes"],"are you sure");
			if (menuresponse.selectedText == "no") {
				menuSelected = "options";
			}
			if (menuresponse.selectedText == "yes") {
				eraseMakeData();
				menuSelected = "options";
				window.alert("Data erased.");
			}
		}
	}
	window.currentBGM = null;
	removeSprite(menuBG);
	//removeSprite(bf);
}

//menu();