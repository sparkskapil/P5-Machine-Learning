var font;
var particles = [];

function preload(){
	font = loadFont("myfont.ttf");
}

function setup() {
  createCanvas(500,500);

  var points = font.textToPoints("C",250,250,80);


  for(var i=0;i<points.length;i++){
  	var source = createVector(0,0);
  	for(var j=0;j<points.length;j++){
  		source.x+=points[j].x;
  		source.y+=points[j].y;
  	}

  	source.x/=points.length;
  	source.y/=points.length;
  	var destination = createVector(points[i].x, points[i].y);
  	var particle = new Particle(source,destination);
  	particles.push(particle);
  }
}

function draw() {
	background(0);
  for(var i=0;i<particles.length;i++){
  	particles[i].update();
  	particles[i].show();
  }
}

Particle = function(source,destination){
	this.pos = source.copy();
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.gravity = createVector(0,0.1);
	this.dest = destination.copy();
	this.maxSpeed=3;
	this.maxForce=0.04;
	this.life=255;

	this.applyForce=function(force){
		this.acc.add(force);
	}

	this.update=function(){
		this.steer();
		//this.applyForce(this.gravity);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.life-=2;
	}
	
	this.steer=function(){
		
		var desired = p5.Vector.sub(this.dest,this.pos);
		d = desired.mag();

		//Slow on Arriving near to target
		if(d<=10)
			this.maxSpeed = map(d,0,10,0,this.maxSpeed);
		desired.setMag(this.maxSpeed);
						
		var steer = p5.Vector.sub(desired,this.vel);
		steer.limit(this.maxForce);
		this.applyForce(steer);
	}

	this.show=function(){
		strokeWeight(5);
	   	stroke(this.life);
	   	//translate();
	   	point(this.pos.x,this.pos.y);
	   
	}

}