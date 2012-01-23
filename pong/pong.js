function init(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    log = new Log();
    screen = {
        width : 640,
        height : 400			
    };	    
    player = new Player();
    player.x = 250;
    player.y = 350;
    ball = new Ball();    
    return setInterval(draw, 1000/60);
}

function draw(){
    context.clearRect(0, 0, screen.width, screen.height);
    player.plot();
    ball.plot();
}

//triggered when mouse is moved
function mousemove(evt){
	player.setX(evt.clientX - canvas.offsetLeft);
	//player.setY(evt.clientY - canvas.offsetTop);
}



var screen;
var canvas;
var context;
var log;
var player;
var ball;

window.addEventListener('mousemove', mousemove);
window.onload = function(){
    init();
}
