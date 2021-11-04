const fs = require('fs').promises;
const path = require('path');
const process = require('process');

async function readFile() {
  try {
    const file = await fs.open(path.join(__dirname, 'text.txt'));
    const stream = file.createReadStream({ encoding: 'utf-8' });
    stream.on('readable', () => {
      stream.close();
      process.stdout.write(stream.read());
    });
  } catch (err) {
    console.log(err);
  }
}

readFile();
