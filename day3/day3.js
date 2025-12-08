var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const day1 = (lines) => {
  let result = 0;

  for (const line of lines) {
    const charge = getHighestVolage(line);
    result += charge;
  }

  return result;
};

const getHighestVolage = (bank) => {
  /*
  scan through the line except for the last number and get 
    the highest number with index
  
  do a second scan from the index and find the greatest number

  return the two numbers
  */

  let first = [-Infinity, null];
  let second = [-Infinity, null];

  for (let i = 0; i < bank.length - 1; i++) {
    const num = Number(bank[i]);

    if (num > first[0]) {
      first[0] = num;
      first[1] = i;
    }
  }

  for (let i = first[1] + 1; i < bank.length; i++) {
    const num = Number(bank[i]);

    if (num > second[0]) {
      second[0] = num;
      second[1] = i;
    }
  }

  return first[0] * 10 + second[0];
};

console.log(day1(parsedInput));
