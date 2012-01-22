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

FleeingSquare.prototype = new Square;
        
function FleeingSquare(){
  this.opponent;
  this.enabled = false;
};    
  
FleeingSquare.prototype.distance = function(){
  var distance = Math.sqrt(Math.pow(this.x - this.opponent.x, 2)+Math.pow(this.y - this.opponent.y, 2));
  return distance;    
}

FleeingSquare.prototype.move = function(){   
  var distance = this.distance();
  
  if( distance < 50 || this.enabled == true){
    var angleDegre = 2;
    if(this.opponent.x < this.x)
      angleDegre = angleDegre*-1;
    var angleRadian = Math.PI*angleDegre/180;
    var sina = Math.sin(angleRadian);
    var cosa = Math.cos(angleRadian);
    var x = this.x * cosa - this.y * sina;
    var y = this.x * sina + this.y * cosa;
    
    if(x > 0 - canvas.offsetLeft && x + this.width < screen.width + canvas.offsetLeft)
      this.x = x;
    if(y > 0 - canvas.offsetTop && y+this.height < screen.height+canvas.offsetTop)
      this.y = y;
    log.message(x+"   "+y); 
    this.enabled = true;       
  }  

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
