function animate(){
	context.clearRect(0, 0, screen.width, screen.height);
	if(x < 100){
		x = x + 0.01;
		context.fillStyle = 'red';
		context.beginPath();
		context.save();
		context.translate(10, 10);
		context.rect(0, 0, 30, 20);
		context.restore();
		context.scale(x, x);
		context.fill();
		log.message(x);
	}
}

//init canvas
function init(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
    log = new Log;
	return setInterval(animate, 1000/2);
}

	
var context;
var canvas;
var x = 1;
var log = new Log();

var screen = {
	width : 640,
	height : 400			
};	

window.onload=function(){
	init();
}

