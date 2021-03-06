
function Mask(width, height){
	this.width = width;
	this.height = height;
}

function Sprite(width, height){
	this.mask = new Mask(width, height);
	this.x = 0;
	this.y = 0;
}

Sprite.prototype.setCoordinates = function (x, y){
	this.x = x;
	this.y = y;
}

Player.prototype = new Sprite;
Player.prototype.constructor = Player;

function Player(width, height){
	this.mask = new Mask(width, height);
	this.x = 0;
	this.y = 0;                
	this.dx = 5;
	this.dy = 5;
	this.hit = false;
}


var canvas;
var context;
var restart;
var WIDTH = 600;
var HEIGHT = 500;
var obstacles = new Array();                       
var player = new Player(20, 20);                
var timer;    

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background.jpg";
initObstacles();

function init(){
	canvas = document.getElementById("mycanvas");
	context = canvas.getContext("2d");
	player.setCoordinates(350, 350); 
	player.hit = false;
	restart = false;   
	return setInterval(animate, 10);
}

function pointIt(e){
	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 

	if(x >= 15 && x <= 95)
		if(y >= 18 && y<=48){
			restart = true;
	}
}

function clear() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

function gui(){
	context.beginPath();
	context.fillStyle = 'blue';
	context.rect(15, 18, 80, 30);
	context.fill();                
	message('restart', 20, 20);
}

function initObstacles(){
	var obstacle = new Sprite(200, 10);
	obstacle.setCoordinates(100, 100);
	obstacles.push(obstacle);
	obstacle = new Sprite(10, 150);
	obstacle.setCoordinates(200, 300);
	obstacles.push(obstacle);
	obstacle = new Sprite(10, 150);
	obstacle.setCoordinates(300, 100);
	obstacles.push(obstacle);
	obstacle = new Sprite(100, 10);
	obstacle.setCoordinates(200, 300);
	obstacles.push(obstacle);
	obstacle = new Sprite(200, 10);
	obstacle.setCoordinates(200, 250);
	obstacles.push(obstacle);
	obstacle = new Sprite(100, 10);
	obstacle.setCoordinates(300, 300);
	obstacles.push(obstacle);
	obstacle = new Sprite(10, 200);
	obstacle.setCoordinates(470, 100);
	obstacles.push(obstacle);

}

function message(text, x, y){
	context.fillStyle = '#000';
	context.font = "24px Helvetica";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText(text, x, y);
}

function checkPlayerCollisions(){
	var xColl, yColl;
	var margin = 5;
	for(var i = 0;i < obstacles.length; i++){
		xColl = false;
		yColl = false;                    
		if(!(player.x + player.mask.width < obstacles[i].x + margin || player.x > obstacles[i].x+obstacles[i].mask.width - margin))
			xColl = true;
			
		if(!(player.y + player.mask.height < obstacles[i].y + margin || player.y > obstacles[i].y+obstacles[i].mask.height - margin))
			yColl = true;                        
			
		if(xColl == true && yColl == true)
			return true;
	}
	return false;
}
			
function animate(){             
	// update
 
	// clear
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	if(bgReady){
		context.drawImage(bgImage, 0, 0);
	}             
	
	gui();
	
	context.fillStyle = '#00f';
	for(var i =0; i<obstacles.length; i++){
		context.beginPath();                    
		context.rect(obstacles[i].x, obstacles[i].y, obstacles[i].mask.width, obstacles[i].mask.height);                    
		context.fill();
	}
	
	context.fillStyle = '#000';
	context.beginPath();
	context.rect(player.x, player.y, 20, 20);                  
	//context.endPath();
	context.fill();
	
	player.hit = checkPlayerCollisions();
	
	if(player.hit == true){
		message('hit', 32, 32);
		clearInterval(timer);
		return;
	}
	
	if(restart == true){
		clearInterval(timer);
		timer = init();
	}
	
}                        

function doKeyDown(evt){
	switch (evt.keyCode) {
		case 38:  //Up arrow was pressed 
			if (player.y - player.dy > 0){
				player.y -= player.dy;
			}
			break;
		case 40:  // Down arrow was pressed 
			if (player.y + player.dy < HEIGHT){
				player.y += player.dy;
			}
			break;
		case 37:  // Left arrow was pressed 
			if (player.x - player.dx > 0){
				player.x -= player.dx;
			}
			break;
		case 39:  // Right arrow was pressed 
			if (player.x + player.dx < WIDTH){
				player.x += player.dx;
			}
			break;
	}
}

window.addEventListener('keydown',doKeyDown,false);           
window.addEventListener('mouseup',pointIt,false);           

window.onload=function(){
	timer = init();
}

