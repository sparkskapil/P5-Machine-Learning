Population=function(position,target,mutation,count){
	this.vehicles = [];
	this.lifetime = 600;
	this.population = count;
	this.target = target;

	this.matingPool=[];

	this.partnerA;
	this.partnerB;
	this.generation = 1;
	this.genFitness = 0;
	this.fitnessSum = 0;

	for(var i = 0; i < this.population; i++)
		this.vehicles.push( new Vehicle( this.lifetime, position, target , mutation) );
	
	this.isExtinct=function(){
		if(this.vehicles[0].geneCount == this.lifetime)
			return true;
		return false;
	}


	this.calculateFitness=function(){
		for(var i=0;i<this.population;i++){
			this.vehicles[i].calculateFitness();
		}	
	}

	this.update = function(){		
		for(var i=0;i<this.population;i++){
			this.vehicles[i].update();
		}
	}
	this.show = function(){		
		for(var i=0;i<this.population;i++){
			this.vehicles[i].show();
		}
	}

	this.reproduce=function(){
		this.randomSelection();
		this.randomCrossOver();
		// this.improvedSelection();
		// this.improvedCrossOver();
		// this.BinarySelection();
		// this.BinaryCrossOver();

		this.generation++;
	}

	this.BinarySelection = function(){
		var bestOne = this.vehicles[0];
		var bestSecond = this.vehicles[1];

		for(var i=2;i<this.population;i++){
			if(bestOne.fitness < this.vehicles[i].fitness)
			{
				bestSecond = bestOne;
				bestOne = this.vehicles[i];
			}
			else if(bestSecond.fitness < this.vehicles[i].fitness){
				bestSecond = this.vehicles[i]
			}
		}

		this.partnerA = bestOne;
		this.partnerB = bestSecond;

	}

	this.BinaryCrossOver=function(){
		this.vehicles = [];
		for(var i=0; i<this.population; i++){
			this.vehicles.push(this.partnerA.CrossOver(this.partnerB));
		}
	}

	this.collision=function(body){
		for(var i=0;i<this.population;i++){
			this.vehicles[i].collision(body);
		}
	}

	this.randomSelection = function(){
		var maxFitness=0;
		this.matingPool=[];
		for(var i=0;i<this.population;i++){
		 	if(this.vehicles[i].fitness > maxFitness)
		 	{
		 		maxFitness = this.vehicles[i].fitness; 
		 	}
		}

		for(var i=0;i<this.population;i++){
			var vehicle = this.vehicles[i];
			var fit = map(vehicle.fitness,0,maxFitness,0,1);
			var fit = floor(fit * 100);
			console.log(fit);
			for(var j=0;j<fit;j++){
				this.matingPool.push(vehicle);
			}
		}

		this.genFitness = maxFitness;
	}
	this.improvedSelection=function(){
		var sum = 0;
		var maxFitness = 0;
		for(var i=0;i<this.population;i++){
			sum += this.vehicles[i].fitness;
		}

		for(var i=0;i<this.population;i++){
			this.vehicles[i].fitness /= sum;
			if(this.vehicles[i].fitness > maxFitness)
				maxFitness = this.vehicles[i].fitness; 
		}

		this.genFitness = maxFitness;
		this.fitnessSum = sum;
	}

	this.improvedCrossOver=function(){
		
		var newVehicles = [];

		for(var i=0;i<this.population;i++){
			var R = random(this.fitnessSum);
			var R = R/this.fitnessSum;
			var index = 0;

			while( ! (R < 0) ){
				R = R - this.vehicles[index].fitness;
				index++;
			} 
			this.partnerA = this.vehicles[index-1];
			
			R = random(1);
			index = 0;

			while( ! (R < 0) ){
				R -= this.vehicles[index].fitness;
				index++;
			} 
			this.partnerB = this.vehicles[index-1];
			
			newVehicles.push( this.partnerA.CrossOver(this.partnerB) );
		} 

		this.vehicles = [];
		arrayCopy(newVehicles,this.vehicles);
	}	

	this.randomCrossOver = function(){
		this.vehicles=[];		
		for(var i=0;i<this.population;i++){
			this.partnerA = this.matingPool[floor(random(this.matingPool.length))];
			this.partnerB = this.matingPool[floor(random(this.matingPool.length))];
			this.vehicles.push(this.partnerA.CrossOver(this.partnerB));
		}	

	}
}