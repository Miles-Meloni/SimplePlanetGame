/*
 * Miles Meloni
 * 12/9/23
 *
 * Code by Edward Talmage referenced 
 *
 */

const SIZE = 800;

var planets = [];
let bg;

class Planet{
  constructor(size, planetImage)
  {
    // initial position
    this.planetX = 400;
    this.planetY = 400;
    
    // Planet will start out in a random direction 
    this.speedY = random(-25, 0);
    this.speedX = random(-20, 20);
    
    this.size = size;
    
    // The image for this ball
    this.planetImage = loadImage(planetImage);
  }
  
  display(){
    ellipse(this.planetX, this.planetY, this.size);
    
    //code generated with chatgpt assistance 
    let imageSize = this.size * 0.95; // Adjust the size of the image to that of the ellipse, and a small border
    image(this.planetImage, this.planetX - imageSize / 2, this.planetY - imageSize / 2, imageSize, imageSize);
  }
  
  checkBounds(){
    let rad = this.size / 2;
    //Code referencing collision system created by Edward Talmage
    //If a ball collides with the wall, its position is moved back inside to ensure it does not fall through the wall.
    //When it collides with the wall, the planet gets slowed down. This is to stop them from accelerating too much.
    
    if ((this.planetX+rad) > width  || (this.planetX-rad) < 0) {
      this.planetX -= this.speedX;
      this.speedX = -this.speedX * 0.9;  
    }
    if ((this.planetY+rad) > height || (this.planetY-rad) < 0) {
      this.planetY -= this.speedY;
  	  this.speedY = -this.speedY * 0.9;  
  	}
  }
  
  fixOutOfBounds(){
    //as a worst case scenario, if a ball falls out of bounds it is brouhght back to the center. 
    
    let rad = this.size / 2;
    if ((this.planetY+rad) > 2 * height || (this.planetY-rad) < - height || 
        (this.planetX+rad) > 2 * width || (this.planetX-rad) < - width) {
      this.planetX = 400;
      this.planetY = 400;
      this.speedX = 0;
      this.speedY = 0;
      }
  }
  
  updateVelocity(){
    //if the mouse is on, the planets will try and orbit it, following the inverse square law.
    if(mouseIsPressed){
      let distanceToMouseX = mouseX - this.planetX; 
      let distanceToMouseY = mouseY - this.planetY;
      let distanceToMouse = sqrt(abs(distanceToMouseX^2) + abs(distanceToMouseY^2));
    
      
      //gravity effect is scaled to make the simulation maximally fun
      let gravityEffect = (1 / distanceToMouse^2) * 0.05;
      //the +1  in the equation here is to stop any potential division by zero erros from occuring
      let gravityEffectX = gravityEffect * (distanceToMouseX / (distanceToMouse + 1));
      let gravityEffectY = gravityEffect * (distanceToMouseY / (distanceToMouse + 1));
      
      //gravity provides acceleration to the velocity
      this.speedX += gravityEffectX;
      this.speedY += gravityEffectY;
    }
    else{
      //else the planets fall 
      this.speedY = this.speedY + 1
    }  
  }
  
  updatePosition(){
    this.planetX += this.speedX;
    this.planetY += this.speedY;
  }
  
}

function setup() {
  //create canvas of desired size
  createCanvas(SIZE, SIZE);
  noStroke();
  
  //set image to stars
  bg = loadImage('images/bg.jpg');
  
  //create asteroids
  for(var i = 0; i < 500; i++){
    var asteroid = new Planet(2,'images/null.png');
    planets[i] = asteroid;
  }
  
  //create our planets
  var planetJupiter = new Planet(150, 'images/jupiter.png');
  planets[500] = planetJupiter;
  var planetNeptune = new Planet(70, 'images/neptune.png');
  planets[501] = planetNeptune;
  var planetVenus = new Planet(40, 'images/venus.png');
  planets[502] = planetVenus;
  var planetMars = new Planet(30, 'images/mars.png');
  planets[503] = planetMars;
}

function draw() {
  background(bg);
  
  for (var i = 0; i < planets.length; i++) {
    planets[i].display();
    planets[i].checkBounds();
    planets[i].updateVelocity();
    planets[i].updatePosition();
    planets[i].fixOutOfBounds();
  }
  
}