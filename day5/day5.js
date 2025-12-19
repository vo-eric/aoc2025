var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

// Find the index of the empty line and split
const emptyLineIndex = parsedInput.findIndex((line) => line === '');
const [firstPart, secondPart] = [
  parsedInput.slice(0, emptyLineIndex),
  parsedInput.slice(emptyLineIndex + 1),
];

const mergeIntervals = (intervals) => {
  const sorted = intervals
    .map((interval) => {
      const [start, end] = interval.split('-');
      return [Number(start), Number(end)];
    })
    .sort((a, b) => a[0] - b[0]);
  const result = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const lastMerged = result[result.length - 1];
    const current = sorted[i];

    if (current[0] <= lastMerged[1]) {
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      result.push(current);
    }
  }

  return result;
};

const part1 = (intervals, ids) => {
  let result = 0;

  for (const id of ids) {
    for (const interval of intervals) {
      if (id >= interval[0] && id <= interval[1]) {
        result++;
        break;
      }
    }
  }
  return result;
};

const merged = mergeIntervals(firstPart);
console.log(
  part1(
    merged,
    secondPart.map((id) => Number(id))
  )
);
