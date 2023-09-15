const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const colours = ["#040D12", "#183D3D", "#5C8374", "#93B1A6"];

let prevX = 100;
let prevY = 0;
let prevWidth = 0;
let prevHeight = 0;

for (let i = 0; i < 20; i++) {
  context.beginPath();
  context.save();
  context.globalAlpha = randomNumber(0.1, 1);

  context.setLineDash([randomNumber(0, 20), randomNumber(0, 20)]);
  context.strokeStyle = "black";
  context.lineWidth = 10;
  context.fillStyle = colours[Math.floor(Math.random() * colours.length)];
  const x = randomNumber(0, canvas.width - 100);
  const y = randomNumber(0, canvas.height - 100);
  const width = randomNumber(10, canvas.width);
  const height = randomNumber(10, canvas.height);
  prevX = x;
  prevY = y;
  prevWidth = width;
  prevHeight = height;

  context.rect(x, y, width, height);
  context.fill();
  context.stroke();
  context.restore();
}
