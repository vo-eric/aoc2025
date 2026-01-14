var fs = require('fs');
const { zstdCompress } = require('zlib');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const part1 = (lines) => {
  const deviceList = {};
  let result = 0;

  for (const line of lines) {
    const [device, connections] = line.split(':');
    const connectionList = connections.trim().split(' ');

    deviceList[device] = connectionList;
  }

  const traverse = (current) => {
    if (current === 'out') {
      result++;
      return;
    }

    const connectedDevices = deviceList[current];

    for (const device of connectedDevices) {
      traverse(device);
    }
  };

  traverse('you');
  return result;
};

console.log(part1(parsedInput));
