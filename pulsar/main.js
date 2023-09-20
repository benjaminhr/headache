const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
const width = 800;
const height = 500;
canvas.width = width * dpr;
canvas.height = height * dpr;
context.scale(dpr, dpr);
context.lineWidth = 2;

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const step = 10;
  const lines = [];

  for (let i = step; i <= height - step; i += step) {
    const line = [];
    for (let j = step; j <= width - step; j += step) {
      const distanceToCenter = Math.abs(j - width / 2);
      const variance = Math.max(width / 2 - 50 - distanceToCenter, 0);
      const random = ((Math.random() * variance) / 2) * -1;
      const point = { x: j, y: i + random };
      line.push(point);
    }
    lines.push(line);
  }

  for (let i = 5; i < lines.length; i++) {
    context.beginPath();
    context.moveTo(lines[i][0].x, lines[i][0].y);

    for (let j = 0; j < lines[i].length - 2; j++) {
      const xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
      const yc = (lines[i][j].x + lines[i][j + 1].y) / 2;
      context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
    }
    context.quadraticCurveTo(
      lines[i][lines[i].length - 2].x,
      lines[i][lines[i].length - 2].y,
      lines[i][lines[i].length - 2 + 1].x,
      lines[i][lines[i].length - 2 + 1].y
    );

    context.quadraticCurveTo(
      lines[i][lines[i].length - 2].x,
      lines[i][lines[i].length - 2].y,
      lines[i][lines[i].length - 2 + 1].x,
      lines[i][lines[i].length - 2 + 1].y
    );

    context.save();
    context.globalCompositeOperation = "destination-out";
    context.fill();
    context.restore();
    context.stroke();
  }

  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 100);
}

animate();
