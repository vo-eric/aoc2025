var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const part2 = (lines) => {
  const grid = Array.from({ length: lines.length }, () =>
    Array.from({ length: lines[0].length }, () => 0)
  );

  const startingColumn = lines[0].indexOf('S');
  lines[0][startingColumn] = '^';
  grid[0][startingColumn] = 1;

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '^') {
        grid[i + 1][j - 1] += grid[i][j];
        grid[i + 1][j + 1] += grid[i][j];
      } else {
        grid[i + 1][j] += grid[i][j];
      }
    }
  }
  return grid[grid.length - 1].reduce((prev, curr) => prev + curr, 0);
};

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

console.log(part2(parsedInput));
