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
    this.backgroundColour = "#0F2C59";
    this.colours = ["#F2EAD3", "#F8F0E5", "#EADBC8", "#DAC0A3"];
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    let handleMousemove = (event) => {
      this.mouseX = event.x;
      this.mouseY = event.y;
      console.log(`X: ${this.mouseX}, Y: ${this.mouseY}`);
    };

    document.addEventListener("mousemove", handleMousemove);
  }

  draw(context) {
    context.save();
    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(200, 200);
    context.rotate(this.mouseX);
    context.stroke();
    context.restore();
  }

  render(context) {
    this.draw(context);
  }
}

const effect = new Effect(canvas);
effect.render(context);
setInterval(effect.render.bind(effect, context), 3000);
