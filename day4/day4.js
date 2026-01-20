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
  const grid = lines.map((line) => line.split(''));
  let result = 0;

  const removePaper = (lines) => {
    let removed = 0;

    for (let i = 0; i < lines.length; i++) {
      const row = lines[i];

      for (let j = 0; j < row.length; j++) {
        if (lines[i][j] !== '@') {
          continue;
        }

        const adjacents = countAdjacent(lines, i, j);

        if (adjacents < 4) {
          lines[i][j] = '.';
          removed++;
        }
      }
    }
    return removed;
  };

  while (true) {
    const paperRemoved = removePaper(grid);

    if (paperRemoved === 0) {
      break;
    }
    result += paperRemoved;
  }

  return result;
};

const part1 = (lines) => {
  let result = 0;

  for (let i = 0; i < lines.length; i++) {
    const row = lines[i];

    for (let j = 0; j < row.length; j++) {
      if (lines[i][j] !== '@') {
        continue;
      }

      const adjacents = countAdjacent(lines, i, j);

      if (adjacents < 4) {
        lines[i][j] = '.';
        result++;
      }
    }
  }

  return result;
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
