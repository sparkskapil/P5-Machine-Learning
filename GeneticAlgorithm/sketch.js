let Pool;

function setup() {
  createCanvas(500,500);
  
  Pool = new Population(1000,"TO BE OR NOT TO BE",0.01);

}

function draw() {

  background(65);
  Pool.calculateFitness();
  // Pool.BinarySelection();
  // Pool.BinaryCrossOver();
  Pool.RandomSelection();
  Pool.RandomCrossOver();
  Pool.evaluate();
  
  textSize(25);
  fill(255, 255, 255);

  textSize(20);
  text("Mutation Rate: " + Pool.mutation*100 + "%", 10, 100);
  text("Generation: " + Pool.Generation, 10, 125);
  text("Fitness Score: " + Pool.bestOne.fitness, 10, 150);
  
  textSize(30);
  // text(Pool.bestOne.printGenes(), 10, 250,490,490);
  text(Pool.randomSelection.printGenes(), 10, 250,490,490);

  
  if(Pool.finish==true)
  	noLoop();  
	console.log();
  
}