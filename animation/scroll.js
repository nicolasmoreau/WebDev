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

//clean screen and draw it again
function animate(){             
	context.clearRect(0, 0, screen.width, screen.height);
	// draw
	if(y>-880){     	
	 y = y-1;
	}    	 
	context.drawImage(image, 0, y);

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
var image = new Image();
image.src="background.jpg";
var y=0;



//window.addEventListener('keydown',function(evt){doKeyDown(evt, player)},false);
//window.addEventListener('mousemove',mousemove,false);
window.onload=function(){
	init();
}
