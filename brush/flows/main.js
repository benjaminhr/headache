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

let palette = spectral.palette("#132043", "#FDF0F0", 9);

// let palette = [
//   "#000000",
//   "#191825",
//   "#2E3840",
//   "#F4DFC8",
//   "#F4EAE0",
//   "#FAF6F0",
// ];

// let palette = spectral.palette("#00357B", "#1F4172", 3);

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);
  background("#fffceb");
  angleMode(DEGREES);
  brush.scale(1);
}

function draw() {
  clear();
  frameRate(1);
  background("#fffceb");
  translate(-width / 2, -height / 2);

  let availableBrushes = brush.box();
  console.log(availableBrushes);

  brush.field("truncated");

  let rectHeight = 20;

  for (let y = 0; y < HEIGHT; y += rectHeight) {
    brush.noStroke();
    brush.noHatch();
    brush.pick("rotring");
    brush.strokeWeight(4);
    brush.stroke("black");
    brush.rect(0, y, WIDTH, random(rectHeight - 2, rectHeight + 2));

    brush.bleed(0, "in");

    brush.fill(random(palette), 100);
    brush.rect(random(0, WIDTH), y, random(10, 200), rectHeight - 3);
    brush.fill(random(palette), 100);
    brush.rect(random(0, WIDTH), y, random(10, 200), rectHeight - 3);
    brush.fill(random(palette), 100);
    brush.rect(random(0, WIDTH), y, random(10, 200), rectHeight - 3);
  }

  noLoop();
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

function keyPressed() {
  if (key === "s") {
    save("frame.png");
  }
}
