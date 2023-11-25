let WIDTH;
let HEIGHT;

// let palette = spectral.palette("#00357B", "#1F4172", 3);
let palette = spectral.palette("#F6F4EB", "#F5F7F8", 8);
// let palette = [
//   "#7b4800",
//   "#002185",
//   "#003c32",
//   "#fcd300",
//   "#ff2702",
//   "#6b9404",
// ];

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  background("black");
  translate(-width / 2, -height / 2);

  brush.scale(1);

  let num_cols = 30;
  let num_rows = 10;
  let border = 100;

  let col_size = (width - border) / num_cols;
  let row_size = (height - border) / num_rows;

  let hatch_brushes = ["marker", "marker2"];
  let stroke_brushes = ["2H", "HB", "charcoal"];

  // "zigzag", "seabed", "curved", "truncated"
  brush.field("truncated");

  for (let i = 0; i < num_rows; i++) {
    for (let j = 0; j < num_cols; j++) {
      if (random() > 0.1) {
        brush.fill(random(palette), random(80, 140));
        brush.bleed(0.2, 0.55, 1);
      } else {
        // brush.set(random(stroke_brushes), random(palette));
        // brush.setHatch(random(hatch_brushes), random(palette));
        // brush.hatch(
        //   random(10, 60), // This is distance between lines
        //   random(0, 180), // This is angle in degrees
        //   { rand: 0, continuous: false, gradient: false }
        // );
      }

      brush.rect(
        border / 2 + col_size * j, // x top left corner
        border / 2 + row_size * i, // y top left corner
        col_size * 2, // width
        row_size * 8 // height
      );

      // Reset states for next cell
      brush.noStroke();
      brush.noFill();
      brush.noHatch();
    }
  }
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

function draw() {
  frameRate(30);

  let availableBrushes = brush.box();
  console.log(availableBrushes);
  // brush.refreshField(frameCount / 10);
}
