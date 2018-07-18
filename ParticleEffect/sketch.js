let rockets=[];
let gravity;
function setup() {
  createCanvas(800,600);

  gravity = createVector(0,0.1);
  rocket = new Rocket();
  rockets.push(rocket);
}

function draw() {
    background(0,0,0);

    var n = random(1);
    if(n<0.1 && rockets.length<8){
    	rockets.push(new Rocket());
    }
    for(var i=rockets.length-1;i>=0;i--){
    	rockets[i].applyForce(gravity);
		rockets[i].update();
		rockets[i].show();  
		if(rockets[i].isFinished()){
			rockets.splice(i,1);
		}
    }
	// rocket.applyForce(gravity);
	// rocket.update();
	// rocket.show();  
	// rocket.isFinished();
}