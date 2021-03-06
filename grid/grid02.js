const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [2048, 2048], // [ width, height ]
  pixelsPerInch: 300 // DPI (resolution, default is 72)
  //units: 'cm' //units can be modified to cemtimeters, inches, etc
  //orientation: 'landscape'
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 25;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          radius: random.value() * 0.01,
          position: [u, v]
        });
      }
    }
    return points;
  };
  //set a 'fixed' random numer
  random.setSeed(512);

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 300;

  return ({ context, width, height }) => {
    //background
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius } = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2);
      context.fillStyle = "red";
      context.lineWidth = 40;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
