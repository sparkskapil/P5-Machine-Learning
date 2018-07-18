
var points = [];
let Equation;
let trainingData=[];
let brain;
let numInputs = 100;

//Higher Order Function
function equation(m,c){
	return function(x){
		return m*x + c;
	}
}

function setup() {
  createCanvas(600,600);
  frameRate(5);
  brain = new Perceptron(3);

  //Create Multiple Points
  for(var i=0;i<numInputs;i++){
  	var p=new Point();
  	points.push(p);
  }

  TrainingData(points);
}

function draw() {
    background(51);
    cartesianPlane();

    for(var i=0;i<points.length;i++){
    	var p = points[i];
    	p.show();
    }
   	
    brain.train(points);
   	ActualLine();
}

function TrainingData(pts){
	Equation = equation(1,0.35);

	for(var i=0;i<pts.length;i++){
		var pt = pts[i];

		var y = Equation(pt.x);

		if(pt.y>=y){
			pt.lab = 1;
		}
		else{
			pt.lab = -1;	
		}

		trainingData[i] = pt;

	}	
}

function ActualLine(){
	let pt1 = new Point(-1, Equation(-1));
	let pt2 = new Point( 1, Equation( 1));

	stroke(255);
	line(pt1.pixelX(),pt1.pixelY(),pt2.pixelX(),pt2.pixelY());
}

function cartesianPlane(){
	stroke(255);
	line(0,height/2,width,height/2);
	line(width/2,0,width/2,height);
}