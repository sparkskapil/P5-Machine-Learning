DNA = function(len,mutationRate){
	this.genes = [];
	this.fitness = 0;
	this.len = len;
	this.mutationRate=mutationRate;

	this.randomize=function(){
		var ran = (64+floor(random(25)));
			if(ran==64)
				ran=32
		return ran;	
	}

	for(var i=0;i<this.len;i++){
		this.genes.push(this.randomize());
	}
	

	this.randomize=function(){
		var ran = (64+floor(random(25)));
			if(ran==64)
				ran=32
		return ran;	
	}
	
	this.createNewDNA=function(genes){
		var dna = new DNA(this.len,this.mutationRate);
		for(i=0;i<this.len;i++){
			dna.genes[i]=genes[i];
		}
		return dna;
	}

	this.crossOver=function(element){
		var newGenes=[];
		for(var i=0; i<this.len; i++){
			if(i<this.len/2){
				newGenes.push(this.mutate(this.genes[i]));
			}
			else{
				newGenes.push(this.mutate(element.genes[i]));
			}
		}

		return this.createNewDNA(newGenes);	
	}


	this.mutate = function(genotype){
		var ran = floor(random(100));
		if(ran<this.mutationRate*100){
			return this.randomize();
		}
		return genotype;
	}


	this.calculateFitness=function(string){
		if(this.fitness == 0)
		for(i=0;i<this.len;i++){
			if( string.charCodeAt(i) == this.genes[i]){
				this.fitness++;
			}
		}
		this.fitness/=string.length;
	}


	this.printGenes=function(){
		var string="";
		for(i=0;i<len;i++){
			string+=String.fromCharCode(this.genes[i]);
		}
		return string;
	}
}