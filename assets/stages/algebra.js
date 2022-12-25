var img = await renderer.createImage(loadUrl("./assets/images/algebraBg.png","imgage/png"));
var map1 = new Sprite(0,0,img,img.width,img.height);
addBGSprite(map1);
scrollingSprites.push({
	x:0,y:-100,sprite:map1,factor:1,scale:1
})
function formatTime( time ) {
  let minutes = Math.floor( time / 60 )
  let timeForSeconds = time - ( minutes * 60 ) // seconds without counted minutes 
  let seconds = Math.floor( timeForSeconds )
  let secondsReadable = seconds > 9 ? seconds : `0${seconds}` // To change 2:2 into 2:02
  return {minutes:minutes,secondsReadable:secondsReadable,seconds:seconds};
}
function getTime() {
	var timeInfo = formatTime((daysSince2000()*86400)-startTime)
	return `${timeInfo.minutes}:${timeInfo.secondsReadable}`;
}
async function waitForTimer(time) {
	while ((!(time == getTime())) && gameShowing) {
		await tickAsync();
	}
}
window.onsongload.push(async () => {
bfPos.y += 40
bouncyIcons = true;
spamRumble = false;
await waitForTimer("1:13")
if (gameShowing) {
	changeCharacter("op","garret_algebra");
	await waitForTimer("2:40")
	if (gameShowing) {
		changeCharacter("op","og_dave");
		await waitForTimer("3:16")
		if (gameShowing) {
			changeCharacter("op","garret_algebra");
			await waitForTimer("3:20")
			if (gameShowing) {
				changeCharacter("op","og_dave");
				await waitForTimer("3:53")
				if (gameShowing) {
					changeCharacter("op","HALL_MONITOR");
					await waitForTimer("6:23")
					if (gameShowing) {
						spamRumble = true;
						changeCharacter("op","diamondMan");
						await waitForTimer("8:00")
						if (gameShowing) {
							changeCharacter("op","playrobot");
							await waitForTimer("9:40")
							if (gameShowing) {
								spamRumble = false;
								changeCharacter("op","og_dave");
							}
						}
					}
				}				
			}
		}
	}
}
});