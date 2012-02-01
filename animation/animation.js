//manage keyboard input
function doKeyPressed(evt){
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			break;
		case 40:  /* Down arrow was pressed */
			break;
		case 37:  /* Left arrow was pressed */
            toLeft = true;
			break;
		case 39:  /* Right arrow was pressed */
            toRight = true;
			break;
	}
}


//manage keyboard input
function doKeyUp(evt){
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
			break;
		case 40:  /* Down arrow was pressed */
			break;
		case 37:  /* Left arrow was pressed */
            toLeft = false;
			break;
		case 39:  /* Right arrow was pressed */
            toRight = false;
			break;
	}
}

function updateSprite(toRight){
    var width = 32;
    
    if(toRight){        
        if (frameToRight == 6){
            frameToRight = 1;
        }else
            frameToRight = frameToRight + 1;
        currentFrame = frameToRight;
        currentLine = 37;
        playerX = playerX + 3;
    }else if(toLeft){
        if (frameToLeft == 5){
            frameToLeft = 10;
        }else
            frameToLeft = frameToLeft - 1;   
        currentFrame = frameToLeft;
        currentLine = 77;
        playerX = playerX - 3;
    }
    
    context.drawImage(image, 32+(currentFrame-1)*width, currentLine, width, 40, playerX, 50, 32, 40 ); 
    //context.drawImage(image, 32+(frameToLeft-1)*width, 77, width, 40, 50, 50, 32, 40 ); 
}

//clean screen and draw it again
function animate(){             
	context.clearRect(0, 0, screen.width, screen.height);
    context.globalCompositeOperation = 'lighter';   // Where both shapes overlap the color is determined by adding color values.
	// draw
    updateSprite(toRight);
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

	
var context;
var canvas;      
var screen = {
	width : 640,
	height : 400			
};		   
var image = new Image();
image.src="spritestoki.png";
var y=350;
var frameToRight = 1;
var frameToLeft = 10;
var currentFrame = frameToRight;
var currentLine = 37;
var playerX = 10;
var toRight = false;
var toLeft = false;


var background = new Image();
background.src="background.jpg";
var backgroundY=0;



window.addEventListener('keypress',function(evt){doKeyPressed(evt)},false);
window.addEventListener('keyup',function(evt){doKeyUp(evt)},false);
//window.addEventListener('mousemove',mousemove,false);
window.onload=function(){
	init();
}
