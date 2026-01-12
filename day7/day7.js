var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const part1 = (lines) => {
  /**
   *
   * create a columns array and initialize it where S is in the first row
   * iterate from 1 to the last row
   *  find all instances of ^ in that row
   *  if the columns array has a value there
   *    increment result by 1
   *    subtract the value at that index by 1 and add 1 to the left and right (if applicable)
   * return result
   */

  let result = 0;
  const columns = new Array(lines[0].length).fill(0);
  const startingIndex = lines[0].indexOf('S');
  columns[startingIndex] = 1;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '^') {
        if (columns[j] === 1) {
          result++;
          columns[j] = 0;
          columns[j + 1] = 1;
          columns[j - 1] = 1;
        }
      }
    }
  }

  return result;
};

console.log(part1(parsedInput));
