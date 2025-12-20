var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const part1 = (lines) => {
  let result = 0;

  const vals = lines.map((line) => line.trim().split(/\s+/));
  const nums = vals.slice(0, -1);
  const operations = vals[vals.length - 1];

  for (let i = 0; i < nums[0].length; i++) {
    const operation = operations[i];

    let res = operation === '*' ? 1 : 0;

    for (let j = 0; j < nums.length; j++) {
      if (operation === '*') {
        res *= Number(nums[j][i]);
      } else {
        res += Number(nums[j][i]);
      }
    }

    result += res;
  }

  return result;
};

console.log(part1(parsedInput));
