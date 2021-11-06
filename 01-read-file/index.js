const fs = require('fs');
const path = require('path');
const process = require('process');

async function readFile() {
  try {
    const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), {
      encoding: 'utf-8',
    });
    stream.on('data', data => {
      process.stdout.write(data.toString());
    });
  } catch (err) {
    console.log(err);
  }
}

readFile();
