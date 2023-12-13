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

// let palette = ["black"];
let palette = spectral.palette("#0F1B23", "#1C2433", 6);

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
  background("#53484D");
  translate(-width / 2, -height / 2);

  let availableBrushes = brush.box();
  console.log(availableBrushes);

  // brush.field("truncated");

  let hatch_brushes = ["marker", "marker2"];
  let stroke_brushes = ["2H", "HB", "charcoal"];

  // "zigzag", "seabed", "curved", "truncated"
  // brush.field("truncated");

  brush.pick("rotring");
  brush.fill(random(palette), 300);
  brush.bleed(0, "in", 0.5);
  brush.fillTexture(0, 1);
  for (let i = 1; i < 6; i++) {
    let cord = i * 200;
    let anchorX = random(cord - 30, cord - 20);
    let anchorY = random(cord - 30, cord - 20);
    let width = 125;
    let hieght = 250;

    for (let x = cord; x < cord + width; x += 20) {
      brush.rect(
        x, // x top left corner
        anchorY, // y top left corner
        3, // width
        height // height
      );
    }

    // brush.rect(
    //   random(cord - 30, cord - 20), // x top left corner
    //   random(cord - 30, cord - 20), // y top left corner
    //   125, // width
    //   250 // height
    // );
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
