const fs = require('fs').promises;
const path = require('path');
const process = require('process');

async function readFile() {
  try {
    const file = await fs.open(path.join(__dirname, 'text.txt'));
    const stream = file.createReadStream({ encoding: 'utf-8' });
    stream.on('data', data => {
      process.stdout.write(data.toString());
    });
  } catch (err) {
    console.log(err);
  }
}

readFile();
