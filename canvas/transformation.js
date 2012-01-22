//plot sprites
function plotSprites(){
	for(var i = 0; i<sprites.length; i++){
		sprites[i].plot();
	}
}

//move sprites if they have a pattern
function moveSprites(){
	for(var i = 0; i<sprites.length; i++){
		if(sprites[i] instanceof SelfMovingSprite)
			sprites[i].move();
	}
}

//triggered when mouse is moved
function mousemove(evt){
	player.setX(evt.clientX - canvas.offsetLeft);
	player.setY(evt.clientY - canvas.offsetTop);
}

//clean screen and draw it again
function animate(){             
	context.clearRect(0, 0, screen.width, screen.height);
	// draw
	moveSprites();
	//plotSprites();	
}   	

//init canvas
function init(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
    log = new Log;
	return setInterval(animate, 1000/60);
}

	
var context;
var canvas;

var screen = {
	width : 640,
	height : 400			
};		

//some sprites
var square = new RotatingSquare;	
square.x = 0;
square.y = 0;
//list of all sprites
//var sprites = new Array(square, square2, circle, player, fleeing);
var sprites = new Array(square);  
var log;



//window.addEventListener('keydown',function(evt){doKeyDown(evt, player)},false);
//window.addEventListener('mousemove',mousemove,false);
window.onload=function(){
	init();
}

