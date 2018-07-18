
Vehicle = function(lt,position, target,mutation){
	this.position = position.copy();
	this.velocity = createVector(0,0);
	this.acceleration = createVector(0,0);
	this.R = 10;
	this.maxSpeed = 4;
	this.maxForce = 0.08;
	
	this.dna = new DNA(lt,mutation);
	this.fitness = 0;
	this.geneCount=0;
	this.collider = 1;

	this.show=function(){
		  var direction = this.velocity.heading() + PI/2;
			push();
			noFill();
			translate(this.position.x,this.position.y);
			if(this.collider===1)
				rotate(direction);
			beginShape(TRIANGLES);
			vertex(0,-this.R);
			vertex(-this.R/2,this.R);
			vertex(this.R/2,this.R);
			endShape();
			pop();
	}

	this.calculateFitness=function(){
		var d = dist(this.position.x,this.position.y,target.x,target.y);
		this.fitness = this.collider/d;

	}

	this.update=function(){

		this.applyForce(this.dna.genes[this.geneCount++]);	
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.velocity.limit(this.maxSpeed);
		this.acceleration.mult(0);
	}

	this.applyForce=function(steer){
		this.acceleration.add(steer);
	}

	this.seek=function(target){
		var desired = p5.Vector.sub(target,this.position);
		desired.setMag(this.maxSpeed);
		
		var steer = p5.Vector.sub(desired,this.velocity);
		steer.limit(this.maxForce);

		this.applyForce(steer);
	}

	this.CrossOver=function(vehicle){
		var newDNA = this.dna.CrossOver(vehicle.dna);
		var newVehicle = new Vehicle(lt,position,target,mutation);

		newVehicle.dna = newDNA;
		return newVehicle;
	}

	this.collision=function(body){
		var x = this.position.x;
		var y = this.position.y;

		var w = body.w;
		var h = body.h;

		var boxX = body.pos.x - w/2;
		var boxY = body.pos.y - h/2;

		if(x>=boxX && x<=boxX+w)
			if(y >= boxY && y<=boxY+h)
			{
				this.maxSpeed = 0;
				this.maxForce = 0;
				if(body.pos != target)
					this.collider = 0;
			}
	}
	
}