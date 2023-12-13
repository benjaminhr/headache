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

let palette = ["white"];

// let palette = spectral.palette("#132043", "#FDF0F0", 9);

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);
  // background("#EEF5FF");
  angleMode(DEGREES);
  brush.scale(1);
}

function draw() {
  clear();
  frameRate(10);
  // background("#EEF5FF");
  background("black");
  // translate(-width / 2, -height / 2);
  translate(width - 800, height - 800);

  let availableBrushes = brush.box();
  console.log(availableBrushes);

  brush.pick("rotring");
  brush.field("truncated");

  let multipliers = [50, 80, 90, 100, 120];

  for (let multiplier of multipliers) {
    let points = [];
    for (let phi = 0; phi < 360; phi++) {
      let r = multiplier * 2 * sin(phi * 6);
      let x = r * cos(phi);
      let y = r * sin(phi);
      points.push([x, y]);
    }

    for (let i = 0; i < points.length - 1; i++) {
      const [x, y] = points[i];
      brush.strokeWeight(random(10, 30));
      // brush.strokeWeight(1);
      brush.stroke(random(palette));
      // brush.line(x, y, points[i + 1][0], points[i + 1][1]);
      let nextPointX = points[i + 1][0];
      let nextPointY = points[i + 1][1];
      let distance = dist(x, y, nextPointX, nextPointY);
      let angle = (Math.atan2(nextPointY - y, nextPointX - x) * 180) / Math.PI;
      brush.flowLine(x, y, distance, angle);
    }
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
