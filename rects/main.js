const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const randomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

window.addEventListener("keydown", (event) => {
  if (event.key == "s") {
    let dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.setAttribute("download", `bauhaus-${randomNumber(1000, 10000)}`);
    link.setAttribute("href", dataUrl);
    link.click();
  }
});

// const colours = ["#040D12", "#183D3D", "#5C8374", "#93B1A6"];
const colours = ["#F2EAD3", "#F8F0E5", "#EADBC8", "#DAC0A3"];

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

  context.save();
  context.beginPath();
  context.fillStyle = "white";
  context.rect(0, 0, canvas.width, canvas.height);
  context.fill();
  context.restore();

  context.beginPath();
  let x = 100;
  let y = 100;
  let width = canvas.width - 200;
  let height = canvas.height - 200;
  context.fillStyle = "#0F2C59"; // initial rectangle colour
  context.rect(x, y, width, height);
  context.fill();
  context.stroke();

  for (let i = 0; i < 30; i++) {
    context.save();
    context.beginPath();
    context.globalAlpha = randomNumber(0.1, 1);
    // context.setLineDash([randomNumber(0, 20), randomNumber(0, 20)]);
    context.strokeStyle = "black";
    context.lineWidth = 10;
    context.fillStyle = colours[Math.floor(Math.random() * colours.length)];

    const newX = randomNumber(x, x + width);
    const newY = randomNumber(y, y + height);
    const newWidth = randomNumber(50, width - newX);
    const newHeight = randomNumber(50, height - newY);
    context.rect(newX, newY, newWidth, newHeight);
    context.fill();
    context.stroke();
    context.restore();
  }

  addGrain();
  context.fillStyle = "black";
  context.font = "bold italic 30px Helvetica";
  context.fillText("benjamin robson", canvas.width - 345, canvas.height - 50);
};

animate();
setInterval(animate, 2000);
