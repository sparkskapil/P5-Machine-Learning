
var Player;
let Target;
let Obstacle=[];

function setup() {
  createCanvas(800,600);
  rectMode(CENTER);

  						// x, y, w, h
  Target = new GameObject(400,25,50,50);
  Obstacle.push( new GameObject(400,200,300,20));
  Obstacle.push( new GameObject(400,300,200,20));



  Player = new Population(createVector(400,380),Target.pos,0.01,100);
}

function draw() {
	background(220);
	//TARGET
	fill(255,100,90);
	rect(Target.pos.x,Target.pos.y,Target.w,Target.h);
	
	//Obstacle
	for(var i=0;i<Obstacle.length;i++)
	{
		fill(100,200,100);
		rect(Obstacle[i].pos.x,Obstacle[i].pos.y,Obstacle[i].w,Obstacle[i].h);
	}

	Player.update();
	Player.collision(Target);
	Player.collision(Obstacle[0]);
	Player.collision(Obstacle[1]);
	Player.show();

	if(Player.isExtinct()){
		Player.calculateFitness();
		Player.reproduce();
	}
	
	displayStats();
}

function displayStats(){

	textSize(20);
	fill(0);
	text('GENERATION: ' + Player.generation,20, 500);
	text('FITNESS: ' + Player.genFitness,20, 540);
}
