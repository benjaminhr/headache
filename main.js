const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillStyle = "white";
context.strokeStyle = "white";
context.lineWidth = 5;

class Particle {
  constructor(effect) {
    this.effect = effect;
    this.x = Math.floor(Math.random() * this.effect.width);
    this.y = Math.floor(Math.random() * this.effect.height);
    this.speedX = Math.random() * 5 - 2.5;
    this.speedY = Math.random() * 5 - 2.5;
    this.history = [{ x: this.x, y: this.y }];
    this.maxLength = Math.floor(Math.random() * 200 + 10);
    this.angle = 0; // radians
  }

  draw(context) {
    context.beginPath();
    context.moveTo(this.history[0].x, this.history[0].y);
    for (let i = 0; i < this.history.length; i++) {
      context.lineTo(this.history[i].x, this.history[i].y);
    }
    context.stroke();
  }

  update() {
    let x = Math.round(this.x / this.effect.cellSize);
    let y = Math.round(this.y / this.effect.cellSize);
    let index = y * this.effect.columns + x;
    this.angle = this.effect.flowField[index];

    this.speedX = Math.cos(this.angle);
    this.speedY = Math.sin(this.angle);
    this.x += this.speedX;
    this.y += this.speedY;

    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > this.maxLength) {
      this.history.shift();
    }
  }
}

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.numberOfParticles = 10;
    this.cellSize = 10;
    this.rows;
    this.columns;
    this.flowField = [];
    this.curve = 0.3;
    this.zoom = 0.2;
    this.init();
  }

  init() {
    this.rows = Math.floor(this.height / this.cellSize);
    this.columns = Math.floor(this.width / this.cellSize);
    this.flowField = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        let angle =
          (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
        this.flowField.push(angle);
      }
    }

    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  render(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
}

const effect = new Effect(canvas.width, canvas.width);

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  effect.render(context);
  requestAnimationFrame(animate);
}

animate();
