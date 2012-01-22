//manage keyboard input
function doKeyDown(evt, sprite){
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			if (sprite.y - sprite.speed > 0){
				sprite.y -= sprite.speed;
			}
			break;
		case 40:  /* Down arrow was pressed */
			if (sprite.y + sprite.speed < screen.height){
				sprite.y += sprite.speed;
			}
			break;
		case 37:  /* Left arrow was pressed */
			if (sprite.x - sprite.speed > 0){
				sprite.x -= sprite.speed;
			}
			break;
		case 39:  /* Right arrow was pressed */
			if (sprite.x + sprite.speed < screen.width){
				sprite.x += sprite.speed;
			}
			break;
	}
}

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
	plotSprites();
	fleeing.distance(player);
	
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
var square = new Square;	
var square2 = new Square;
square2.y = 100;
square2.isFull  = true;
var circle = new Circle;
circle.y = 50;

var fleeing = new FleeingSquare;
fleeing.x = 50;
fleeing.y = 50;

//sprite moved by user
var player = new Player;		

//list of all sprites
var sprites = new Array(square, square2, circle, player, fleeing);  
var log;



//window.addEventListener('keydown',function(evt){doKeyDown(evt, player)},false);
window.addEventListener('mousemove',mousemove,false);
window.onload=function(){
	init();
}
