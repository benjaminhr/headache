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
    this.audioContext = null;
    this.analyser = null;
    this.audioSource = null;
    this.dataArray = null;
    this.initialised = false;
    this.fftSize = 512;
    this.barWidth = canvas.width / (this.fftsize / 2);
  }

  loadAudio() {
    const audio = new Audio();
    audio.src = "../examples/audio.mp3";
    this.audioContext = new AudioContext();
    this.audioSource = this.audioContext.createMediaElementSource(audio);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftsize = this.fftSize;

    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.initialised = true;
    audio.play();
  }

  getSamples() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSamples = [...this.dataArray].map((el) => el / 128 - 1);
    return normSamples;
  }

  getVolume() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSamples = [...this.dataArray].map((el) => el / 128 - 1);
    let sum = 0;
    for (let i = 0; i < normSamples.length; i++) {
      sum += normSamples[i] * normSamples[i];
    }
    let volume = Math.sqrt(sum / normSamples.length);
    return volume;
  }

  draw(context) {
    let bars = [];
    context.beginPath();
    for (let i = 0; i < this.fftSize / 2; i++) {
      const bar = new Bar(this.barWidth * i, 300, this.barWidth, 150, "red", i);
      bars.push(bar);
      bar.draw(context, this.getVolume());
    }

    context.stroke();
  }

  addGrain = (amount) => {
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

  render(context) {
    this.draw(context);
  }
}

class Bar {
  constructor(x, y, width, height, color, index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.index = index;
  }

  update(input) {
    this.height = input;
  }

  draw(context, volume) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

const effect = new Effect(canvas);
effect.loadAudio();

function animate() {
  if (effect.initialised) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    effect.render(context);
  }
  requestAnimationFrame(animate);
}

animate();
