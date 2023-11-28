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

// let palette = spectral.palette("#132043", "#FDF0F0", 9);

const rects = [];

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);
  background("#fffceb");
  angleMode(DEGREES);
  brush.scale(1);

  let brushes = ["rotring", "HB", "2B", "2H"];

  // for (let x = 0; x < WIDTH; x += 20) {
  //   let buildingWidth = random(5, 40);
  //   let brush = random(brushes);
  //   let stroke = random(1, 10);
  //   let colour = random(palette);
  //   let y = HEIGHT / 3;
  //   let width = random(50, 80);
  //   let height = random(200, 450);
  //   rects.push({
  //     buildingWidth,
  //     brush,
  //     stroke,
  //     colour,
  //     x,
  //     y,
  //     width,
  //     height,
  //   });
  // }
}

function draw() {
  clear();
  frameRate(10);
  background("#fffceb");
  translate(-width / 2, -height / 2);

  let availableBrushes = brush.box();
  console.log(availableBrushes);

  brush.field("truncated");

  // for (const rect of rects) {
  //   console.log(rect);
  //   brush.pick(rect.brush);
  //   brush.strokeWeight(rect.stroke);
  //   brush.stroke(rect.colour);
  //   brush.rect(rect.x, rect.height, rect.width, rect.height);
  // }

  for (let x = 0; x < WIDTH; x += 20) {
    let buildingWidth = random(5, 40);
    brush.pick("rotring");
    brush.strokeWeight(random(3, 8));
    brush.stroke(random(palette));
    brush.rect(
      random(0, WIDTH),
      random(0, HEIGHT),
      random(40, 100),
      random(200, 450)
    );
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
