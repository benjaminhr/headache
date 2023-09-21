const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.lineWidth = 5;
context.lineCap = "round";
context.strokeStyle = "#F5F5DC";

context.fillStyle = "#004225";
context.fillRect(0, 0, canvas.width, canvas.height);

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const addGrain = (amount) => {
  const canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
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

let x = randomNumber(canvas.width / 2 - 100, canvas.width / 2 + 100);
let y = randomNumber(canvas.height / 2 - 200, canvas.height / 2 - 100);

for (let i = 0; i < 100; i++) {
  const lineLength = randomNumber(-200, 200);
  const moveX = Math.random() > 0.5;

  // context.quadraticCurveTo(
  //   lines[i][lines[i].length - 2].x,
  //   lines[i][lines[i].length - 2].y,
  //   lines[i][lines[i].length - 2 + 1].x,
  //   lines[i][lines[i].length - 2 + 1].y
  // );

  context.beginPath();
  context.moveTo(x, y);
  if (moveX) {
    x = x + lineLength;
    context.lineTo(x, y);
  } else {
    y = y + lineLength;
    context.lineTo(x, y);
  }

  context.shadowColor = "#FFB000";
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.stroke();
}

addGrain(13);
