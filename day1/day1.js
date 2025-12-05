var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const part1 = (lines) => {
  let result = 0;
  let currentValue = 50;
  for (const line of lines) {
    const direction = line.slice(0, 1);
    const count = line.slice(1);

    currentValue = rotate(direction, currentValue, count);

    if (currentValue === 0) {
      result++;
    }
  }

  return result;
};

const part2 = (lines) => {
  let result = 0;
  let currentValue = 50;
  for (const line of lines) {
    const direction = line.slice(0, 1);
    const count = line.slice(1);

    for (let i = 0; i < count; i++) {
      if (currentValue === 0 || currentValue === 100) {
        result++;
      }

      if (direction === 'L') {
        if (currentValue === 0) {
          currentValue = 100;
        }

        currentValue -= 1;
      }

      if (direction === 'R') {
        if (currentValue === 100) {
          currentValue = 0;
        }

        currentValue += 1;
      }
    }
  }

  return result;
};

const rotate = (direction, currentValue, count, result) => {
  for (let i = 0; i < count; i++) {
    if (direction === 'L') {
      if (currentValue === 0) {
        currentValue = 100;
        result++;
      }

      currentValue -= 1;
    }

    if (direction === 'R') {
      if (currentValue === 100) {
        currentValue = 0;
        result++;
      }

      currentValue += 1;
    }
  }

  return currentValue % 100;
};

console.log(part2(parsedInput));
