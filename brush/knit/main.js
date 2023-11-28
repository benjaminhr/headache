let WIDTH;
let HEIGHT;

let palette = [
  "#7b4800",
  "#002185",
  "#003c32",
  "#fcd300",
  "#ff2702",
  "#6b9404",
];

// let palette = [
//   ...spectral.palette("#7b4800", "#7b4805", 3),
//   ...spectral.palette("#002185", "#002190", 3),
//   ...spectral.palette("#003c32", "#003c37", 3),
//   ...spectral.palette("#fcd300", "#fcd305", 3),
//   ...spectral.palette("#ff2702", "#ff2707", 3),
//   ...spectral.palette("#6b9404", "#6b9409", 3),
// ];

let posOfSquares = [];
let padding = 100;

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);
  background("#fffceb");
  angleMode(DEGREES);
  brush.scale(1);

  for (let i = 0; i < palette.length; i++) {
    let x = random(padding, WIDTH - padding);
    let y = random(padding, HEIGHT - padding);
    posOfSquares.push([x, y]);
  }
}

function draw() {
  // clear();
  frameRate(50);
  // background("#fffceb");
  translate(-width / 2, -height / 2);

  let availableBrushes = brush.box();
  console.log(availableBrushes);

  // brush.field("seabed");

  for (let i = 0; i < posOfSquares.length; i++) {
    let [x, y] = posOfSquares[i];
    let [nextX, nextY] =
      i == posOfSquares.length - 1 ? posOfSquares[0] : posOfSquares[i + 1];

    brush.noStroke();
    brush.noHatch();
    brush.fill(palette[i], 100);
    brush.rect(x, y, 20, 20);
    // brush.circle(x, y, 5, false);

    brush.stroke("black");
    brush.strokeWeight(3);
    brush.pick("rotring");
    brush.line(x, y, nextX, nextY);
    // let angle = (Math.atan2(nextY - y, nextX - x) * 180) / Math.PI;
    // let distance = Math.sqrt(Math.pow(x - nextX, 2) + Math.pow(y - nextY, 2));
    // brush.flowLine(x, y, distance, 360 - angle);
  }

  for (let i = 0; i < posOfSquares.length; i++) {
    posOfSquares[i][0] += random(-20, 20);
    posOfSquares[i][1] += random(-20, 20);
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
    saveFrames("frame", "png");
  }
}
