var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const DIRS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];

const part2 = (lines) => {
  let res = 0;

  // Convert strings to arrays of characters so we can modify them
  const grid = lines.map((line) => line.split(''));

  const part1 = () => {
    let result = 0;

    for (let i = 0; i < grid.length; i++) {
      const row = grid[i];

      for (let j = 0; j < row.length; j++) {
        if (grid[i][j] !== '@') {
          continue;
        }

        const adjacents = countAdjacent(grid, i, j);

        if (adjacents < 4) {
          grid[i][j] = '.';
          result++;
        }
      }
    }

    console.log('result', result);
    return result;
  };

  while (part1() > 0) {
    res += part1();
  }

  return res;
};

const countAdjacent = (grid, row, col) => {
  let count = 0;

  for (const dir of DIRS) {
    const [dx, dy] = dir;
    const checkedRow = row + dx;
    const checkedCol = col + dy;

    if (
      checkedRow < 0 ||
      checkedRow >= grid.length ||
      checkedCol < 0 ||
      checkedCol >= grid[0].length
    ) {
      continue;
    }

    if (grid[checkedRow][checkedCol] === '@') {
      count++;
    }
  }

  return count;
};

console.log(part2(parsedInput));
