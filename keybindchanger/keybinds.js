var keyValues = {
	back:document.getElementById("backKey"),
	up:document.getElementById("upKey"),
	down:document.getElementById("downKey"),
	left:document.getElementById("leftKey"),
	right:document.getElementById("rightKey"),
	menuup:document.getElementById("menuupKey"),
	menudown:document.getElementById("menudownKey"),
	menuleft:document.getElementById("menuleftKey"),
	menuright:document.getElementById("menurightKey"),
	confirm:document.getElementById("confrimKey")
};
var keyButtons = {
	back:document.getElementById("changeBackKey"),
	up:document.getElementById("changeUpKey"),
	down:document.getElementById("changeDownKey"),
	left:document.getElementById("changeLeftKey"),
	right:document.getElementById("changeRightKey"),
	menuup:document.getElementById("changeMenuupKey"),
	menudown:document.getElementById("changeMenudownKey"),
	menuleft:document.getElementById("changeMenuleftKey"),
	menuright:document.getElementById("changeMenurightKey"),
	confirm:document.getElementById("changeConfirmKey")
};
var apply = document.getElementById("apply");
var back = document.getElementById("back");
var fs = require("fs");
var fsp = require("fs/promises");
var path = require("path");
var os = require("os");
var homedir = os.homedir();
var fngPath = path.join(homedir,"FNGFiles");
var keybinds = JSON.parse(fs.readFileSync(path.join(fngPath,"settings/keybinds.json"),{encoding:"UTF-8"}));
function keyToString(key) {
	var keyString = key;
	if (keyString == " ") {
		keyString = "Space";
	}
	return keyString;
}
var keys = [
	"back",
	"left",
	"right",
	"up",
	"down",
	"menuup",
	"menudown",
	"menuright",
	"menuleft",
	"confirm"
];
keys.forEach(function (name) {
	console.log(name)
	keyValues[name].value = keyToString(keybinds[name]);
	keyButtons[name].onclick = function () {
		keyValues[name].value = "Press A key.";
		apply.disabled = true;
		keys.forEach((n) => {
			keyButtons[n].disabled = true;
		})
		document.onkeydown = function (e) {
			keyValues[name].value = keyToString(e.key);
			keybinds[name] = e.key;
			apply.disabled = false;
			document.onkeydown = null;
			keys.forEach((n) => {
				keyButtons[n].disabled = false;
			})
		}
	};
});
apply.onclick = function () {
	fs.writeFileSync(path.join(fngPath,"settings/keybinds.json"),JSON.stringify(keybinds,null,"\t"),{encoding:"UTF-8"});
	window.alert("Controls set.");
};
back.onclick = function () {
	var keybindscurrent = fs.readFileSync(path.join(fngPath,"settings/keybinds.json"),{encoding:"UTF-8"});
	if (keybindscurrent == JSON.stringify(keybinds,null,"\t")) {
		window.location.replace("../index.html");
	} else {
		var GoBack = window.confirm("Keybinds are unsaved. Are you sure you want to go back?");
		if (GoBack) {
			window.location.replace("../index.html");
		}
	}
};