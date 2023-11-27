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

function preload() {
  img = loadImage("sky.jpg");
}

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
  background("white");
  translate(-width / 2, -height / 2);

  let availableBrushes = brush.box();
  console.log(availableBrushes);

  img.loadPixels();
  let numPixels = 4 * img.width * img.height;
  // for (let i = 0; i < numPixels; i += 4) {
  //   const rgba = []
  //   rgba.push(
  //     img.pixels[i],
  //     img.pixels[i + 1],
  //     img.pixels[i + 2],
  //     img.pixels[i + 3],
  //   )
  //   pixels.push(rgba)
  // }

  let border = 5;

  let k = 20;
  for (let x = 0; x < img.width; x += k) {
    for (let y = 0; y < img.height; y += k) {
      const rgba = img.get(x, y);
      brush.fill(`rgb(${(rgba[0], rgba[1], rgba[2], rgba[3])})`, 0);
      brush.rect(
        x / k, // x top left corner
        y / k, // y top left corner
        5, // width
        5 // height
      );

      // Reset states for next cell
      brush.noStroke();
      brush.noFill();

      // fill(...rgba);
      // noStroke();
      // rect(x / k, y / k, 5, 5);
    }
  }

  // brush.fill(`rgb(${(rgba[0], rgba[1], rgba[2], rgba[3])})`, 110);
  // // brush.bleed(0.2, 0.55, 1);
  // brush.set("HB", `rgb(${(rgba[0], rgba[1], rgba[2], rgba[3])})`, 10);
  // brush.rect(
  //   x, // x top left corner
  //   y, // y top left corner
  //   col_size, // width
  //   row_size // height
  // );

  // // Reset states for next cell
  // brush.noStroke();
  // brush.noFill();
  // brush.noHatch();

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
