Point=function(x,y){
	this.x = random(-1,1);
	this.y = random(-1,1);
	this.lab = 0;

	if(x!=undefined && y!=undefined){
		this.x = x;
		this.y = y;
	}


	this.pixelX=function(){
		return map(this.x,-1,1,0,width);
	}

	this.pixelY=function(){
		return map(this.y,-1,1,0,height);
	}

	this.show=function(){
		push();
		
		if(this.lab==-1){
			strokeWeight(2);
			stroke(0);
			fill(255);
		}
		else{
			strokeWeight(1);
			stroke(255);
			fill(0);	
		}
		ellipse(this.pixelX(),this.pixelY(),8,8);
		pop();
	}

}