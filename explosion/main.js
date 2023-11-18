const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

context.globalCompositeOperation = "color-burn";

// const colours = [
//   "#738BE0",
//   "#5B74C9",
//   "#3D529D",
//   "#262F5B",
//   "#2A1E27",
//   "#231425",
// ]
const colours = [
  "#D7750A",
  "#E38106",
  "#6B84C4",
  "#1039A2",
  "#13153C",
  "#F21A00",
];
// const colours = [
//   "#3B9AB2",
//   "#78B7C5",
//   "#EBCC29",
//   "#E1AF00",
//   "#F21A00"
// ]

function stroke(x1, y1, x2, y2, width) {
  for (let i = 0; i < 10; i++) {
    const range = 3;
    const newX1 = rand(x1 - range, x1 + range);
    const newX2 = rand(x2 - range, x2 + range);
    const newY1 = rand(y1 - range, y1 + range);
    const newY2 = rand(y2 - range, y2 + range);

    context.beginPath();
    context.moveTo(newX1, newY1);
    context.lineTo(newX2, newY2);
    context.strokeStyle = colours[rand(0, colours.length)];
    context.lineWidth = rand(1, 2);
    context.stroke();
  }
  // addGrain(10);
}

const addGrain = (amount) => {
  const canvasImage = context.getImageData(0, 0, canvas.width, canvas.height, {
    willReadFrequently: true,
  });
  const pixels = canvasImage.data;
  const pixelCount = 4 * canvas.width * canvas.height;

  for (let i = 0; i < pixelCount; i += 4) {
    const grainAmount = Math.round(
      Math.random() * (amount - -amount) + -amount
    );
    pixels[i] = pixels[i] + grainAmount;
    pixels[i + 1] = pixels[i + 1] + grainAmount;
    pixels[i + 2] = pixels[i + 2] + grainAmount;
  }
  const image = new ImageData(pixels, canvas.width, canvas.height);
  context.putImageData(image, 0, 0);
};

const leftBound = 400;
const rightBound = 1000;
let direction = "right";

const x = canvas.width / 2;
const y = 850;

function animate(x2, y2) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 800; i++) {
    let x1 = rand(0, canvas.width);
    let y1 = rand(0, canvas.height);
    stroke(x1, y1, x2, y2, 5);
  }

  addGrain(10);

  requestAnimationFrame(() => {
    // if (x2 < leftBound) {
    //   direction = "right";
    if (x2 > rightBound) {
      direction = "left";
    }

    if (direction == "right") {
      x2 += 20;
      y2 += rand(-20, 20);
    } else {
      x2 -= 20;
      y2 -= rand(-20, 20);
    }
    animate(x2, y2);
  });
}

animate(x, y);
