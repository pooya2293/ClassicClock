/* setInterval */
setInterval(setClock,1000);
/* touch in hand's clock */
const hour_hand = document.querySelector('[data-hour-hand]');
const min_hand = document.querySelector('[data-minute-hand]');
const sec_hand = document.querySelector('[data-second-hand]');
/* function setClock */
function setClock(){
	// get date
	const date = new Date();
	// get Seconds
	const s = date.getSeconds() / 60 ;
	// get Minutes
	const m = (date.getMinutes() + s )/60;
	// get Hours
	const h = (date.getHours() + m)/12;


	// setRotation second hand clock
	setRotation(sec_hand,s);
	// setRotation minutes hand clock
	setRotation(min_hand,m);
	// setRotation hours hand clock
	setRotation(hour_hand,h);
}
	

/* function setRotation */
function setRotation(element,rotationRate) {
	element.style.setProperty('--rotation',rotationRate * 360)
}
