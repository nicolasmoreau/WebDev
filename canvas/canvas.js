
//default class for sprites
function Sprite(){
	this.x = 0; 
	this.y = 0;	
	this.isFull = false;	
	this.color = 'red';
}

//default plot function
Sprite.prototype.plot = function(){
	return true;
}

Sprite.prototype.setColor = function(){
	context.strokeStyle = this.color;
	context.fillStyle = this.color;			
}

//move on its own
function SelfMovingSprite(){}
SelfMovingSprite.prototype = new Sprite;		
SelfMovingSprite.prototype.move = function(){return true;};	

//move on x axis		
function LinearSprite(){}	
LinearSprite.prototype = new SelfMovingSprite();
LinearSprite.prototype.move = function(){
	if(this.x + this.width < screen.width )
		this.x = this.x+1;
}

Square.prototype = new LinearSprite;

function Square(){
	this.width = 20;
	this.height = this.width;
}

Square.prototype.plot = function(){
	context.beginPath();		
	this.setColor();	
	context.rect(this.x, this.y, this.height, this.width);
	if(!this.isFull)
		context.stroke();
	else context.fill();
}	

Circle.prototype = new LinearSprite();

function Circle(){
	this.radius = 20;			
}

Circle.prototype.plot = function(){
	context.beginPath();
	this.setColor();			
	context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
	context.stroke();
}

Player.prototype = new Sprite();

function Player(){
	this.width = 15;
	this.height = 15;
	this.speed = 5;
	this.x = 200;
	this.y = 200;
	this.color = 'blue';			
}

Player.prototype.plot = function(){
	this.setColor();
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.fill();
}

Player.prototype.setX = function(x){
	if(x + this.width < screen.width && x > 0)
		this.x = x;
}

Player.prototype.setY = function(y){
	if(y + this.height < screen.height && this.y > 0)
		this.y = y;
}

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
	player.setX(evt.clientX);
	player.setY(evt.clientY);
	log.message("X : "+evt.clientX+"  Y : "+evt.clientY);
}

//clean screen and draw it again
function animate(){             
	context.clearRect(0, 0, screen.width, screen.height);
	// draw
	moveSprites();
	plotSprites();
	
}   	

//init canvas
function init(){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
  log = new Log;
  log.message("test : "+canvas.offsetTop);	
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
square2.isFull = true;
var circle = new Circle;
circle.y = 50;

//sprite moved by user
var player = new Player;		

//list of all sprites
var sprites = new Array(square, square2, circle, player);  
var log;



//window.addEventListener('keydown',function(evt){doKeyDown(evt, player)},false);
window.addEventListener('mousemove',mousemove,false);
window.onload=function(){
	init();
}
