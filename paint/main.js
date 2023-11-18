import SimplexNoise from "https://cdn.jsdelivr.net/npm/simplex-noise@3.0.0/dist/esm/simplex-noise.js";

const simplex = new SimplexNoise();

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Array.prototype.insert = function (index, ...items) {
  this.splice(index, 0, ...items);
};

const colours = [
  "#D7750A",
  "#E38106",
  "#6B84C4",
  "#1039A2",
  "#13153C",
  "#F21A00",
];

// const colours = spectral.palette("#72A0C1", "#0a2351", 9);

let A = [300, 1000];
let B = [500, 1000];
let points = [A, B]; // points between A and B

for (let i = 0; i < 1000; i++) {
  let noise = simplex.noise2D(rand(-500, 500), rand(-500, -500));
  let newPoint = [
    Math.round(rand(points[i][0], points[i + 1][0]) * noise),
    Math.round(rand(points[i][1], points[i + 1][1]) * noise),
  ];

  points.insert(i, newPoint);
}

for (let i = 0; i < points.length - 1; i++) {
  context.beginPath();
  context.moveTo(points[i][0], points[i][1]);
  context.lineTo(points[i + 1][0], points[i + 1][1]);
  context.strokeStyle = colours[rand(0, colours.length)];
  context.lineWidth = rand(1, 10);
  context.stroke();
}

// function animate() {
//   context.globalAlpha = 0.3;

//   let A = [300, 1000];
//   let B = [500, 1000];

//   context.beginPath();
//   context.moveTo(A[0], A[1]);
//   context.lineTo(B[0], B[1]);
//   context.stroke();

//   let prevNewPoint = [A[0], A[1]];

//   for (let i = 0; i < 50; i++) {
//     let noise = simplex.noise2D(prevNewPoint[0], prevNewPoint[1]);
//     let newPoint = [
//       rand(prevNewPoint[0], prevNewPoint[0]) + noise * 100,
//       rand(prevNewPoint[1], prevNewPoint[1]) * noise,
//     ];
//     prevNewPoint = newPoint;

//     context.beginPath();
//     context.moveTo(A[0], A[1]);
//     context.lineTo(newPoint[0], newPoint[1]);
//     context.moveTo(newPoint[0], newPoint[1]);
//     context.lineTo(B[0], B[1]);
//     context.strokeStyle = colours[rand(0, colours.length)];
//     context.lineWidth = rand(1, 10);
//     context.stroke();
//   }

//   setTimeout(() => {
//     requestAnimationFrame(animate);
//   }, 100);
// }

// animate();
