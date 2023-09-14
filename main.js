const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.speedX = Math.random() * 5 - 2.5;
    this.speedY = Math.random() * 5 - 2.5;
    this.speedModifier = Math.round(Math.random() * 3 + 1);
    this.history = [{ x: this.x, y: this.y }];
    this.maxLength = Math.floor(Math.random() * 200 + 10);
    this.angle = 0; // radians
    this.timer = this.maxLength * 2;

    const colours = ["#84b384", "#E8E7B7", "#9A7D51"];
    this.stroke = colours[Math.round(Math.random() * colours.length)];
    this.lineWidth = Math.round(Math.random() * 16) + 0.5;
    this.lineCap = "round";
  }

  draw(context) {
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.stroke;
    context.lineCap = this.lineCap;

    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.stroke();
  }

  update() {
    this.timer--;
    if (this.timer >= 1) {
      let x = Math.round(this.x / this.effect.cellSize);
      let y = Math.round(this.y / this.effect.cellSize);
      let index = y * this.effect.columns + x;
      this.angle = this.effect.flowField[index];

      this.speedX = Math.sin(this.angle);
      this.speedY = Math.cosh(this.angle);
      this.x += this.speedX * this.speedModifier;
      this.y += this.speedY * this.speedModifier;

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > this.maxLength) {
        this.history.shift();
      }
    } else if (this.history.length > 1) {
      this.history.shift();
    } else {
      this.reset();
    }
  }

  reset() {
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.history = [{ x: this.x, y: this.y }];
    this.timer = this.maxLength * 2;
  }
}

class Effect {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 400;
    this.cellSize = 10;
    this.rows;
    this.columns;
    this.flowField = [];
    this.curve = 10;
    this.zoom = 0.02;
    this.debug = false;
    this.init();

    window.addEventListener("keydown", (e) => {
      if (e.key == "d") this.debug = !this.debug;
    });

    window.addEventListener("resize", (e) => {
      this.resize(e.target.innerWidth, e.target.innerHeight);
    });
  }

  init() {
    this.rows = Math.floor(this.height / this.cellSize);
    this.columns = Math.floor(this.width / this.cellSize);
    this.flowField = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        // let angle = Math.sinh(x * this.zoom) + Math.cosh(y * this.zoom);
        // let angle =
        //   (Math.log2(x * this.zoom) + Math.log2(y * this.zoom)) * this.curve;
        // let angle = Math.tan(x * this.zoom) * this.curve;
        let angle =
          (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
        this.flowField.push(angle);
      }
    }

    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  drawGrid(context) {
    context.save();
    context.lineWidth = 0.2;
    context.strokeStyle = "black";
    for (let c = 0; c < this.columns; c++) {
      context.beginPath();
      context.moveTo(this.cellSize * c, 0);
      context.lineTo(this.cellSize * c, this.height);
      context.stroke();
    }

    for (let r = 0; r < this.rows; r++) {
      context.beginPath();
      context.moveTo(0, this.cellSize * r);
      context.lineTo(this.width, this.cellSize * r);
      context.stroke();
    }
    context.restore();
  }

  addGrain(context) {
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
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  render(context) {
    if (this.debug) {
      this.drawGrid(context);
    }

    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
    this.addGrain(context);
  }
}

const effect = new Effect(canvas);

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#8A5031";
  context.fillRect(0, 0, canvas.width, canvas.height);
  effect.render(context);
  requestAnimationFrame(animate);
}

/*
  create json config file with all settings (seed?)
*/

animate();
