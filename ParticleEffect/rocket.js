Rocket = function(){
	this.pos = createVector(random(50,width-50),height);
	this.vel = createVector(0,random(-8,-11));
	this.acc = createVector(0,0);
	this.R = 10;
	this.exploded = false;
	this.isParticle = false;

	this.particles=[];
	this.life = 255;
	
	this.colour = [random(1),random(1),random(1)];

	this.gravity = createVector(0,0.1);

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.isFinished =function(){
		return this.exploded==true && this.particles.length==0
	}


	this.explode = function(){
		for(var i=0;i<200;i++){
			var particle = new Rocket();
			particle.pos = this.pos.copy();
			particle.vel = p5.Vector.fromAngle(random(2*PI));
			particle.vel.mult(random(3));
			particle.R = 3;
			particle.isParticle = true;
			particle.colour = this.colour;
			this.particles.push(particle);
		}
	}

	this.update=function(){
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);

		if(this.vel.y >= 0 && this.isParticle == false && this.exploded==false){
			this.exploded = true;
			this.explode();
		}

		if(this.exploded == true)
			for(var i=this.particles.length-1; i>=0; i--){
				this.particles[i].applyForce(this.gravity);
				this.particles[i].update();
				this.particles[i].show();

				this.particles[i].life-=5;
				if(this.particles[i].life<=0){
					this.particles.splice(i,1);
				}
			}
	}

	this.show=function(){
		if(this.exploded == false){
			noStroke();
			var col = [this.life*this.colour[0],this.life*this.colour[1],this.life*this.colour[2]];
			fill(col);
			ellipse(this.pos.x,this.pos.y,this.R,this.R);
		}
	}

}