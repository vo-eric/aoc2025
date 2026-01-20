var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const day1 = (lines) => {
  let result = 0;

  for (const line of lines) {
    const charge = getHighestVolage(line, 0, 12, 0);
    result += charge;
  }

  return result;
};

const getHighestVolage = (bank, current, remaining, prevIndex) => {
  if (current.toString().length === 12) {
    return current;
  }

  let highest = -Infinity;
  let index = prevIndex;

  for (let i = prevIndex; i <= bank.length - remaining; i++) {
    if (Number(bank[i]) > highest) {
      highest = Number(bank[i]);
      index = i;
    }
  }

  return getHighestVolage(
    bank,
    current * 10 + highest,
    remaining - 1,
    index + 1
  );
};

console.log(day1(parsedInput));
