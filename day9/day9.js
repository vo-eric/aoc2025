var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const processed = parsedInput.map((line) => {
  const [first, second] = line.split(',');
  return [Number(first), Number(second)];
});

const part1 = (lines) => {
  let result = -Infinity;

  for (let i = 0; i < lines.length - 1; i++) {
    const [x1, y1] = lines[i];
    for (let j = i + 1; j < lines.length; j++) {
      const [x2, y2] = lines[j];
      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
      result = Math.max(result, area);
    }
  }

  return result;
};

console.log(part1(processed));
