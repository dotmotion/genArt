const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [2048, 2048], // [ width, height ]
  pixelsPerInch: 300 // DPI (resolution, default is 72)
  //units: 'cm' //units can be modified to cemtimeters, inches, etc
  //orientation: 'landscape'
};

const sketch = () => {
  // Generating a random color palette
  const colorCount = random.rangeFloor(2, 6)
  const palette = random.shuffle(random.pick(palettes))
    .slice(0, colorCount)

  // Creating a point grid
  const createGrid = () => {
    const points = [];
    const count = 35;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.035
        points.push({
          color: random.pick(palette),
          radius,
          position: [u, v]
        });
      }
    }
    return points;
  };
  //set a 'fixed' random numer
  // random.setSeed(512);

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 200;

  return ({ context, width, height }) => {
    //background
    context.fillStyle = "#16191b";
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { 
        position, 
        radius,
        color
      } = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2);
      context.fillStyle = color;
      context.lineWidth = 40;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
