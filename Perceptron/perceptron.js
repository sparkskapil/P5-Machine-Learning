Perceptron=function(numInputs){
	this.weights=[];
	this.LR =0.001;

	for(var i=0;i<numInputs;i++){
		var w = random();
		this.weights.push(w);
	}

	this.train=function(inputs){
		for(var i=0;i<inputs.length;i++){
			var pt = inputs[i];
			var input = [pt.x,pt.y,1];
			var guessed = this.guess(input);
			
			if(guessed == pt.lab){
				fill(0,200,0);
    			ellipse(pt.pixelX(),pt.pixelY(),8,8);
			}

			else{
				fill(200,0,0);
    			ellipse(pt.pixelX(),pt.pixelY(),8,8);	
    			var error = pt.lab - guessed;
				this.tweakWeights(error,input);
			}
		}

		this.expectedLine();

	}

	this.guessY=function(x){
		w0 = this.weights[0];
		w1 = this.weights[1];
		w2 = this.weights[2];
		return -(w2/w1) - (w0/w1)*x;
	}

	this.expectedLine=function(){
		var pt1 = new Point(-1,this.guessY(-1));
		var pt2 = new Point( 1,this.guessY( 1));
		stroke(255);
		line(pt1.pixelX(),pt1.pixelY(),pt2.pixelX(),pt2.pixelY());
	}

	this.tweakWeights=function(error,input){
		for(var i=0;i<this.weights.length;i++){
			this.weights[i]+= error*input[i]*this.LR;
		}
	}

	this.guess = function(input){
		var sum = 0;
		for(var i=0; i<this.weights.length;i++){
			var weight = this.weights[i];
			sum+= input[i]*weight;
		}
		return this.Sign(sum);
	}

	//Activation Function
	this.Sign=function(WeightedSum){
		if(WeightedSum<0)
			return -1;
		else
			return 1;
	}
}