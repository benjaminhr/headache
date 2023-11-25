let WIDTH;
let HEIGHT;

// let palette = [
//   "#2c695a",
//   "#4ad6af",
//   "#7facc6",
//   "#4e93cc",
//   "#f6684f",
//   "#ffd300",
// ];
let palette = spectral.palette("#00357B", "#1F4172", 3);
// let palette = spectral.palette("#132043", "#FDF0F0", 9);

let dots = [];

function createDots() {
  let newDots = [];
  // WTF is this cordinate system
  for (let y = -1500; y < HEIGHT; y += 50) {
    for (let x = -1500; x < WIDTH; x += 20) {
      newDots.push([x * noise(x), y * noise(y)]);
    }
  }

  return newDots;
}

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  background("#fffceb");
  brush.scale(1);
  brush.field("seabed");
  brush.bleed(0.9);
  dots = createDots();
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

let degree = 180;
let degreeDirection = "up";
let size = 350;

function draw() {
  frameRate(30);
  clear();
  background("#fffceb");

  let availableBrushes = brush.box();
  console.log(availableBrushes);

  // palette = spectral.palette(, random(palette), 9);
  // brush.set(name_brush, color, weight)
  // brush.set("rotring", random(palette), random(1, 2));

  for (let i = 0; i < dots.length; i++) {
    // (x, y, length, direction)
    brush.set("hatch_brush", random(palette), random(1, 3));
    dots[i] = [dots[i][0], dots[i][1]];
    brush.flowLine(dots[i][0], dots[i][1], size, 250);
  }

  if (degree < 130) {
    degreeDirection = "up";
  } else if (degree > 180) {
    degreeDirection = "down";
  }

  if (degreeDirection === "up") {
    degree += 1;
    size += 20;
  } else {
    degree -= 1;
    size -= 5;
  }

  // if (size > 30) size = 0;

  noLoop();
}
