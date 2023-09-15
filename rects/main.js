const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const colours = ["#040D12", "#183D3D", "#5C8374", "#93B1A6"];

const addGrain = () => {
  const canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = canvasImage.data;
  const pixelCount = 4 * canvas.width * canvas.height;
  const amount = 15;

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

const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  let x = 100;
  let y = 100;
  let width = canvas.width - 200;
  let height = canvas.height - 200;
  context.fillStyle = colours[1];
  context.rect(x, y, width, height);
  context.fill();
  context.stroke();

  for (let i = 0; i < 30; i++) {
    context.beginPath();
    context.globalAlpha = randomNumber(0.1, 1);
    // context.setLineDash([randomNumber(0, 20), randomNumber(0, 20)]);
    // context.strokeStyle = "black";
    context.lineWidth = 5;
    context.fillStyle = colours[Math.floor(Math.random() * colours.length)];

    const newX = randomNumber(x, x + width);
    const newY = randomNumber(y, y + height);
    const newWidth = randomNumber(50, width - newX);
    const newHeight = randomNumber(50, height - newY);
    context.rect(newX, newY, newWidth, newHeight);
    context.fill();
    context.stroke();
  }

  addGrain();
};

setInterval(animate, 2000);
