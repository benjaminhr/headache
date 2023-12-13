let palette = [
  "#7b4800",
  "#002185",
  "#003c32",
  "#fcd300",
  "#ff2702",
  "#6b9404",
];

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  brush.scale(1);

  background("#191919");

  translate(-width / 2, -height / 2);

  // We define the brushes for the hatches, and the brushes for the strokes
  let hatch_brushes = ["marker", "marker2"];
  let stroke_brushes = ["2H", "HB", "charcoal"];

  // Test Different Flowfields here:
  // "zigzag", "seabed", "curved", "truncated"
  // You can also disable field completely with brush.noField()
  brush.field("truncated");

  for (let i = 0; i < 10; i++) {
    brush.pick("rotring");
    brush.fill(random(palette), random(80, 140));
    brush.bleed(0.001);
    brush.fillTexture(0.55, 0.9);

    // We draw the rectangular grid here
    brush.rect(
      random(0, windowWidth), // x top left corner
      random(0, windowHeight), // y top left corner
      random(40, 80), // width
      windowHeight // height
    );
  }
}
