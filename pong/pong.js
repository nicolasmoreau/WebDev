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
    initBricks();
    return setInterval(draw, 1000/60);
}

function message(text, x, y){
	context.fillStyle = '#000';
	context.font = "24px Helvetica";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText(text, x, y);
}

function draw(){
    context.clearRect(0, 0, screen.width, screen.height);
    if(bricks.length > 0){
        player.plot();
        ball.plot();        
        for(var i=0;i<bricks.length;i++)
            bricks[i].plot();
    }else{
        message("Over", (canvas.width/2)-canvas.offsetLeft, (canvas.height/2)-canvas.offsetTop);
    }
}

//triggered when mouse is moved
function mousemove(evt){
	player.setX(evt.clientX - canvas.offsetLeft);
	//player.setY(evt.clientY - canvas.offsetTop);
}

function initBricks(){
    var list = new Array([10, 10], [100, 100]);
    for(var i = 0; i<list.length; i++){
        brick = new Brick();
        brick.x = list[i][0];
        brick.y = list[i][1];
        bricks.push(brick);
    }
}


var screen;
var canvas;
var context;
var log;
var player;
var ball;
var bricks = new Array();

window.addEventListener('mousemove', mousemove);
window.onload = function(){
    init();
}
