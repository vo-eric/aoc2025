var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const part1 = (lines) => {
  let result = 0;
  const ranges = lines.split(',');

  for (const range of ranges) {
    const [start, end] = range.split('-');

    for (let i = Number(start); i <= Number(end); i++) {
      const stringed = i.toString();
      const midpoint = Math.ceil(stringed.length / 2);
      const firstHalf = stringed.slice(0, midpoint);
      const secondHalf = stringed.slice(midpoint);

      if (firstHalf === secondHalf) {
        console.log('hit', stringed);
        result += Number(stringed);
      }
    }
  }

  return result;
};

console.log(part1(input));
