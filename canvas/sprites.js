// JavaScript Document

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

function FleeingSquare(){};
FleeingSquare.prototype = new Square();
FleeingSquare.prototype.distance = function(sprite){
  //log.message("test : "+this.x+ " "+sprite.x);
  var distance = Math.sqrt(Math.pow(this.x - sprite.x, 2)+Math.pow(this.y - sprite.y, 2));
  log.message(distance);
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
