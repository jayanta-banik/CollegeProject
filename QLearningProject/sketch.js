
class Player
{
	constructor(){
		this.x = 200;
		this.y = 500;
		this.r = 25;

		this.state = 2;
	}
	moveLeft(){
		if(this.state >= 2){
			this.state -= 1;
			this.x -= 100;
		}
	}
	moveRight(){
		if(this.state <= 2){
			this.x += 100;
			this.state += 1;
		}
	}
	isCollision(obj){
		if(sq(this.x - obj.x) + sq(this.y - obj.y) >= sq(this.r + obj.r)){
			return true;
		}
		return false;
	}
	draw(){
		fill(255);
		ellipse(this.x, this.y, this.r, this.r);
	}
}

class ColObject
{
	constructor(n){
		this.x = 100*(n%3 + 1);
		this.y = 0;
		this.r = 50;
	}
	update(){
		this.y += 5;
	}
	isCollision(obj){
		if(sq(this.x - obj.x) + sq(this.y - obj.y) >= sq(this.r/2 + obj.r/2)){
			return false;
		}
		return true;
	}
	draw(){
		fill(200);
		ellipse(this.x, this.y, this.r, this.r);
	}
}

var player;
var obstacle;
var score;
var isObject;

function setup()
{
	player = new Player();
	obstacle = [];
	obstacle.push(new ColObject(2));
	score = 0;
	isObject = false;

    createCanvas(800, 600);
    background(255);
}

function update()
{
	if(obstacle[0].y > 600){
		obstacle.pop();
		obstacle.push(new ColObject(round(random(1,4))));
		score += 1;
	}
    if(obstacle[0].isCollision(player) != true){
    	obstacle[0].update();
    }
    else if(obstacle[0].isCollision(player) == true){
    	obstacle.pop();
		obstacle.push(new ColObject(round(random(1,4))));
		score -= 1;
    }

    for(i = 0; i < obstacle.length; i++){
    	if(obstacle[i].x == player.x){
    		isObject = true;
    	}
    }

    fill(0);
    textSize(24);
    text("score : " + score, 600, 20);
    obstacle[0].draw();
    player.draw();
}

function draw()
{
    clear();
    background(255);

    line(100, 0, 100, 600);
    line(200, 0, 200, 600);
    line(300, 0, 300, 600);

    update();
}