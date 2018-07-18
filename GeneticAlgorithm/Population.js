Population = function(count,string,mutation){
	this.count = count;
	this.string = string;
	this.mutation = mutation;

	this.population = [];
	
	this.bestOne;
	this.bestSecond;
	
	this.finish = false;
	this.Generation = 1;

	this.matingPool=[];
	this.maxFitness;

	this.randomSelection;

	for(i=0;i<this.count;i++){
		this.population.push(new DNA(this.string.length,this.mutation));
	}

	this.calculateFitness=function(){
		for(i=0;i<this.count;i++){
			this.population[i].calculateFitness(this.string);
		}
	}

	this.BinarySelection =function(){
		for(var i=0;i<this.count;i++){
			if(this.population[i].fitness == this.string.length)
				this.finish = true;
			
			if(i==0){
				this.bestOne = this.population[i];
				this.bestSecond = this.bestOne;
			}
			
			else if(this.bestOne.fitness < this.population[i].fitness){
				this.bestSecond = this.bestOne; 
				this.bestOne = this.population[i];
			}
			
			else if(this.bestSecond.fitness < this.population[i].fitness){
				this.bestSecond = this.population[i];
			}
		}
		this.maxFitness = this.bestOne.fitness;
	}


	this.RandomSelection=function(){
		// Calculate Maximum Fitness among Population
		this.matingPool = [];
		this.maxFitness = this.population[0].fitness;
		this.randomSelection = this.population[0];
		for(var i=1;i<this.count;i++){
			if(this.maxFitness < this.population[i].fitness){
				this.maxFitness = this.population[i].fitness;
				this.randomSelection = this.population[i];
			}
		}

		for(var i=0;i<this.count;i++){
			var n = map(this.population[i].fitness,0,this.maxFitness,0,1);
			for(var j=0;j<floor(n*100);j++){
				this.matingPool.push(this.population[i]);
			}
		}

	}

	this.RandomCrossOver=function(){
		this.population=[];
		for(var i=0; i<count; i++){
			var m = floor(random(1)*this.matingPool.length);
			var n = floor(random(1)*this.matingPool.length);
			this.bestOne = this.matingPool[m];
			this.bestSecond = this.matingPool[n];
			var newElement;
			newElement = this.bestOne.crossOver(this.bestSecond);
			this.population.push(newElement);
		}

		this.Generation++;
	}

	
	this.BinaryCrossOver=function(){
		this.population = [];
		this.Generation++;
		for(var i=0;i<this.count;i++){
			if(i<this.count/2)
				this.population.push(this.bestOne.crossOver(this.bestSecond));
			else
				this.population.push(this.bestSecond.crossOver(this.bestOne));
		}
	}

	this.evaluate=function(){
		if(this.maxFitness == this.string.length){
			this.finish = true;
		}
	}
}