
	
var context;
var canvas;      
var screen = {
	width : 640,
	height : 400			
};		   

var player = {
    x : 10,
    y : 50,
    isMovingLeft : false,
    isMovingRight : false,    
    isJumping : false,
    jumpTimer : 5,
    currentJump : 0,
   
    goToRight : function(){
        this.x = this.x+3;
        if(this.isJumping == false)
            this.sprite.goToRight();
    },
    
    goToLeft : function(){
        this.x = this.x-3;
        if(this.isJumping == false)
            this.sprite.goToLeft();
    },
    
    jump : function(){
        this.sprite.jump();        
        if(this.isMovingLeft)
            this.goToLeft();
        if(this.isMovingRight)
            this.goToRight();
    },
    
    lauchJumpTimer : function(){
        this.isJumping = true;
        this.currentJump = this.jumpTimer;
    },
    
    decreaseJumpTimer : function(){        
        this.currentJump = this.currentJump -1;
        if(this.currentJump <= 0)
            this.isJumping = false;
    },
    
    sprite : {
        imageSrc : 'spritestoki.png',
        image : null,
        caseWidth : 32,
        caseHeight : 40, 
        toLeft : false,
        toRight : true,
        frameToRight : 1,
        frameToLeft : 10,
        currentFrame : null,
        
        getImage : function(){
            if (this.image == null){
                this.image  = new Image();
                this.image.src=this.imageSrc;    
                this.currentFrame = 1;
            }   
            return this.image;
        },
        
        goToLeft : function(){
            this.toLeft = true;
            this.toRight = false;
            
            if (this.frameToLeft <= 5){
               this. frameToLeft = 10;
            }else
                this.frameToLeft = this.frameToLeft - 1;    
            this.currentFrame = this.frameToLeft;
        },
        
        goToRight : function(){
            this.toLeft = false;
            this.toRight = true;        
            
            if (this.frameToRight >= 6){
                this.frameToRight = 1;
            }else
                this.frameToRight = this.frameToRight + 1;
            this.currentFrame = this.frameToRight;
        },  
        
        jump : function(){
            if(this.toLeft){
                this.frameToLeft = 2;
                this.currentFrame = this.frameToLeft;
            }else if(this.toRight){
                this.frameToRight = 9;
                this.currentFrame = this.frameToRight;
            }        
        },
        
        getCaseX : function(){
            return 32+(this.currentFrame-1)*this.caseWidth;
        },
        
        getCaseY : function(){
            if(this.toRight)
                return 37;
            else if(this.toLeft)
                return 77;
        }
    }
}

var background = new Image();
background.src="background.jpg";
var backgroundY=0;


//manage keyboard input
function doKeyDown(evt){
	switch (evt.keyCode) {
		case 38:  // Up arrow was pressed 
			break;
		case 40:  // Down arrow was pressed 
			break;
		case 37:  // Left arrow was pressed 
            player.isMovingLeft = true;
            player.isMovingRight = false;
			break;
		case 39:  // Right arrow was pressed 
            player.isMovingLeft = false;
            player.isMovingRight = true;
			break;
	}
}

//manage keyboard input
function doKeyPressed(evt){
	switch (evt.keyCode) {
		case 32:  // space bar was pressed 
            player.lauchJumpTimer();
			break;
	}
}


//manage keyboard input
function doKeyUp(evt){
	switch (evt.keyCode) {        
		case 38:  
			break;
		case 40:  
			break;
		case 37:  
            player.isMovingLeft = false;
            player.isMovingRight = false;
			break;
		case 39:  
            player.isMovingLeft = false;
            player.isMovingRight = false;
			break;
	}
}

function updateSprite(){
    var image = player.sprite.getImage();

    if(player.isJumping){
        player.jump();   
        player.decreaseJumpTimer();
    }
    else if(player.isMovingLeft)
        player.goToLeft();
    else if(player.isMovingRight)
        player.goToRight();
        
    context.drawImage(image, player.sprite.getCaseX(), player.sprite.getCaseY(), player.sprite.caseWidth, 40, player.x, 50, 32, 40 ); 
}

//clean screen and draw it again
function animate(){             
	context.clearRect(0, 0, screen.width, screen.height);
    context.globalCompositeOperation = 'lighter';   // Where both shapes overlap the color is determined by adding color values.
	// draw
    updateSprite();
	if(backgroundY>-880){     	
        backgroundY = backgroundY-1;
	}    	 
	context.drawImage(background, 0, backgroundY);    
}   	

//init canvas
function init(){
	canvas = document.getElementById("canvas");    
	context = canvas.getContext("2d");
    log = new Log;
	return setInterval(animate, 1000/15);
}

window.addEventListener('keydown',function(evt){doKeyDown(evt)},false);
window.addEventListener('keyup',function(evt){doKeyUp(evt)},false);
window.addEventListener('keypress',function(evt){doKeyPressed(evt)},false);
//window.addEventListener('mousemove',mousemove,false);
window.onload=function(){
	init();
}
