var fs = require('fs');
const { zstdCompress } = require('zlib');
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

const part2 = (lines) => {
  let result = 0;
  const ranges = lines.split(',');

  for (const range of ranges) {
    const [start, end] = range.split('-');

    for (let i = Number(start); i <= Number(end); i++) {
      let invalid = false;
      let stringed = i.toString();
      const length = stringed.length;

      for (let j = 1; j < length; j++) {
        const parts = [];
        while (stringed.length) {
          parts.push(stringed.slice(0, j));
          stringed = stringed.slice(j);
        }

        if (parts.every((part) => part === parts[0])) {
          invalid = true;
        }
        stringed = i.toString();
      }

      if (invalid) result += i;
    }
  }

  return result;
};

console.log(part2(input));

/*
111

range = 
slice(0,1) => 1
while (currentString.length) {
  parts.push(currentString(range);
}
helper(parts?)


*/
