DNA = function(lt,mutation){
	
	this.lifetime = lt;
	this.genes = [];
	this.maxForce = 0.1;
	this.mutation = mutation;

	this.randomForce=function(){
		var angle = floor(random(TWO_PI));
		var F = p5.Vector.fromAngle(angle);
		F.mult(random(0,this.maxForce));
		return F;
	}

	//GENERATE RANDOM VECTORS IN GENE;
	for(var i=0;i<this.lifetime;i++){
		this.genes.push(this.randomForce());
	}


	this.CrossOver=function(dna){
		var limit = floor(random(this.lifetime));	
		
		var newDNA = new DNA(lt,mutation);

		for(var i=0;i<this.lifetime;i++){
			if(i<this.limit){
				newDNA.genes[i]=this.genes[i];
			}
			else{
				newDNA.genes[i]=dna.genes[i];	
			}
		}

		return this.mutate(newDNA);
	}


	this.mutate=function(dna){
		
		for(var i=0;i<this.lifetime;i++){
			var R = floor(random(1)*100);
			if(R < this.mutation * 100){
				dna.genes[i] = this.randomForce();
			}
		}
		return dna;
	}

}