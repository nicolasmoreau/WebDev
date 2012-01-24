// JavaScript Document

//default class for sprites
function Sprite(){
	this.x = 0; 
	this.y = 0;	
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
	context.rect(this.x, this.y, this.width, this.height);
    context.fill();
}

Brick.prototype = new Square();
function Brick(){
    this.width = 300;
    this.height = 30;
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

Ball.prototype.objectCollision = function(object){
    //collision with left of object
    if(this.x + this.width >= object.x && this.x+ this.width <= object.x+1){
        if(this.y <= object.y+object.height && this.y >= object.y){
            this.vectorx = -1 * this.vectorx;  
            this.vectory = -1 * this.vectory;               
            return true;
        }
    } 
    
    //collision with right of object
    if(this.x  <= object.x + object.width && this.x >= object.x+object.width+1){
        if(this.y <= object.y+object.height && this.y >= object.y){
            this.vectorx = -1 * this.vectorx;  
            this.vectory = -1 * this.vectory;               
            return true;
        }
    }     
    //collision with top of object
    if(this.x + this.width > object.x && this.x < object.x + object.width){
        if(this.y + this.height >= object.y && this.y + this.height <= object.y+object.height){    
            this.vectory = -1 * this.vectory;            
            this.object = true;
            return true;
        }
    }   

    //collision with bottom of object
    if(this.x + this.width > object.x && this.x < object.x + object.width){
        if(this.y <= object.y+object.height && this.y >= object.y){
            this.vectory = -1 * this.vectory;            
            this.object = true;
            return true;
        }
    }     
    return false;
}


Ball.prototype.move = function(){ 
    var collision = false;    
    for(var i = 0;i<bricks.length;i++){
        collision = this.objectCollision(bricks[i]);
        if(collision == true)
            break;
    }
        
    //collision with player
    if(collision == false){        
        collision = this.objectCollision(player);
        if(collision == true)
            this.playerCollided;
    }
    //collision with borders
    if(collision == false)
        collision = this.bordersCollision();   
    
    log.message(player.toRight);
    //effects according to player movements    
    if(this.playerCollided){
        if(!player.toRight){
            log.message("playerCollided");
            if(this.vectorx > 0){
                log.message("change direction");
                this.vectorx = this.vectorx * -1;
            }
        }
        if(player.toRight){
            log.message("playerCollided");
            if(this.vectorx < 0){
                log.message("change direction");
                this.vectorx = this.vectorx * -1;
            }
        }
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


