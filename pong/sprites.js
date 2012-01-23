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

//player
Player.prototype = new Sprite();

function Player(){
	this.width = 50;
	this.height = 20;
	this.speed = 5;
	this.color = 'blue';
    this.toRight = false;			
}

Player.prototype.plot = function(){
	this.setColor();
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.fill();
}

Player.prototype.setX = function(x){
    if(x > this.x)
        this.toRight = true;
    else
        this.toRight = false;
        
	if(x + this.width <= screen.width && x >= 0)
		this.x = x;
}

Player.prototype.setY = function(y){
	if(y + this.height <= screen.height && y >= 0){
		this.y = y;
    }
}

//ball
Ball.prototype = new Sprite();

function Ball(){
	this.width = 10;
	this.height = 10;
	this.speed = 5;
	this.x = 200;
	this.y = 200;
	this.color = 'black';	
    
    this.vectorx = 1;
    this.vectory = 4;		
    //this.absorb = 0.5;
    this.playerCollided = false;
}

Ball.prototype.bordersCollision = function(){
    var yreversed = false;
    
    if(this.x < 0 || this.x+this.width > screen.width){
       this.vectorx = -1 * this.vectorx;
    }
    
    if(this.y < 0 || this.y+this.height > screen.height){
        this.vectory = -1 * this.vectory;
        //yreversed = true;
    }  
    
    //this.x = this.x+this.vectorx;
    //this.y = this.y+this.vectory;     
    
    //if(yreversed)
    //    this.vectory = this.vectory * this.absorb;    
}

Ball.prototype.playerCollision = function(){
    //collision with top of player
    if(this.x + this.width > player.x && this.x < player.x + player.width){
        if(this.y + this.height >= player.y && this.y + this.height <= player.y+player.height){  
            log.message('coll top');          
            this.vectory = -1 * this.vectory;            
            this.playerCollided = true;
            return;
        }
    }   

    //collision with bottom of player
    if(this.x + this.width > player.x && this.x < player.x + player.width){
        if(this.y <= player.y+player.height && this.y >= player.y){
            log.message('coll bottom');  
            this.vectory = -1 * this.vectory;            
            this.playerCollided = true;
            return;
        }
    } 
    
    //collision with left of player
    if(this.x + this.width >= player.x && this.x+ this.width <= player.x+1){
        if(this.y <= player.y+player.height && this.y >= player.y){
            log.message('coll left');  
            this.vectorx = -1 * this.vectorx;  
            this.vectory = -1 * this.vectory;               
            return;
        }
    } 
    
    //collision with right of player
    if(this.x  <= player.x + player.width && this.x >= player.x+player.width+1){
        if(this.y <= player.y+player.height && this.y >= player.y){
            log.message('coll right');  
            this.vectorx = -1 * this.vectorx;  
            this.vectory = -1 * this.vectory;               
            return;
        }
    } 
}

Ball.prototype.move = function(){   
    //collision with player
    this.playerCollision();
    //collision with borders
    this.bordersCollision();   
    
    //effects according to player movements    
    if(this.playerCollided){
        if(!player.toRight)
            if(this.vectorx > 0)
                this.vectorx = this.vectorx * -1;
        if(player.toRight)
            if(this.vectorx < 0)
                this.vectorx = this.vectorx * -1;
    }
    
    this.y = this.y+this.vectory;  
    this.x = this.x+this.vectorx;  
    
    //if ball inside player, put it on top
    if(this.playerCollided && this.y + this.height > player.y && this.y + this.height <= player.y + player.height){
        this.y = player.y-this.width;
    }
    //if ball inside player, put it below
    else if(this.playerCollided && this.y < player.y+player.height && this.y > player.y){
        this.y = player.y+player.height;
    }
    
    
    this.playerCollided = false;
}

Ball.prototype.plot = function(){
	this.setColor();
    this.move();
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.fill();
}


