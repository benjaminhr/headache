let WIDTH;
let HEIGHT;

// let palette = [
//   "#7b4800",
//   "#002185",
//   "#003c32",
//   "#fcd300",
//   "#ff2702",
//   "#6b9404",
// ];

let colourA = "white";
let colourB = "gray";

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  brush.scale(1);
}

function draw() {
  clear();
  frameRate(5);
  // translate(-width / 2, -height / 2);

  background("#002185");

  let availableBrushes = brush.box();
  console.log(availableBrushes);

  const radius = 100;
  const blur = 15; // random(8, 12);

  brush.push();
  brush.fill(colourA, 50);
  brush.set("marker2", colourA, blur);
  const leftX = -((frameCount * 2) % 50) - 20;
  brush.circle(leftX, 0, radius, true);
  brush.pop();

  brush.rotate(frameCount);

  // brush.push();
  // brush.fill(colourB, 50);
  // brush.set("charcoal", colourB, frameCount);
  // const rightX = ((frameCount * 2) % 50) + 20;
  // brush.circle(frameCount % 50, 0, radius, true);
  // brush.pop();

  // noLoop();
}

function windowResized() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
  if (windowHeight > windowWidth) {
    factor = windowHeight;
    factdiv = 1080;
  } else {
    factor = windowWidth;
    factdiv = 1920;
  }
}
