const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const randomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};
class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    // this.backgroundColour = "#183D3D";
    this.backgroundColour = "#0F2C59";
    // this.colours = ["#040D12", "#183D3D", "#5C8374", "#93B1A6"];
    this.colours = ["#F2EAD3", "#F8F0E5", "#EADBC8", "#DAC0A3"];
    this.init();

    window.addEventListener("keydown", (event) => {
      if (event.key == "s") this.download();
    });
  }

  init() {}

  download() {
    domtoimage.toJpeg(canvas, { quality: 1 }).then((dataUrl) => {
      const link = document.createElement("a");
      link.setAttribute("download", `bauhaus-${randomNumber(1000, 10000)}`);
      link.setAttribute("href", dataUrl);
      link.click();
    });
  }

  drawRectangles(context) {
    context.clearRect(0, 0, this.width, this.height);

    context.save();
    context.beginPath();
    context.fillStyle = "white";
    context.rect(0, 0, this.width, this.height);
    context.fill();
    context.restore();

    context.beginPath();
    let x = 150;
    let y = 150;
    let width = this.width - 300;
    let height = this.height - 300;
    context.fillStyle = this.backgroundColour;
    context.rect(x, y, width, height);
    context.fill();
    context.stroke();

    for (let i = 0; i < 30; i++) {
      context.save();
      context.beginPath();
      context.globalAlpha = randomNumber(0.1, 1);
      context.strokeStyle = "black";
      context.lineWidth = 10;
      context.fillStyle =
        this.colours[Math.floor(Math.random() * this.colours.length)];

      const newX = randomNumber(x, x + width);
      const newY = randomNumber(y, y + height);
      const newWidth = randomNumber(50, width - newX - 150);
      const newHeight = randomNumber(50, height - newY - 50);
      context.rect(newX, newY, newWidth, newHeight);
      context.fill();
      context.stroke();
      context.restore();
    }

    this.addGrain();
    // context.fillStyle = "black";
    // context.font = "bold italic 30px Futura";
    // context.filter = "revert";
    // context.fillText(
    //   "benjamin robson",
    //   canvas.width - 375,
    //   canvas.height - 100
    // );
  }

  addGrain = () => {
    const canvasImage = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = canvasImage.data;
    const pixelCount = 4 * canvas.width * canvas.height;
    const amount = 80;

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

  render(context) {
    this.drawRectangles(context);
  }
}

const effect = new Effect(canvas);
effect.render(context);
setInterval(effect.render.bind(effect, context), 3000);
