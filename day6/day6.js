var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const part2 = (lines) => {
  let result = 0;

  const operations = lines[lines.length - 1].trim().split(/\s+/);
  console.log(operations);
  let currentOperation = operations.pop();
  let currentResult = currentOperation === '+' ? 0 : 1;
  const values = lines.slice(0, lines.length - 1);

  for (let i = values[0].length - 1; i >= 0; i--) {
    let vals = [];

    for (let j = 0; j < values.length; j++) {
      vals.push(values[j][i]);
    }

    if (vals.every((val) => val === ' ')) {
      currentOperation = operations.pop();
      result += currentResult;
      currentResult = currentOperation === '+' ? 0 : 1;
      continue;
    }

    const valToOperate = Number(
      vals
        .map((val) => {
          return val === '0' ? '0' : val;
        })
        .join('')
    );

    console.log('before', currentResult, valToOperate);
    if (currentOperation === '+') {
      currentResult += valToOperate;
    } else {
      currentResult *= valToOperate;
    }

    console.log('current', currentResult);
  }

  result += currentResult;
  return result;
};

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

console.log(part2(parsedInput));
