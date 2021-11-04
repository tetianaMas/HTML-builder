const fs = require('fs').promises;
const path = require('path');
const pathToSecretFolder = path.join(__dirname, 'secret-folder');
const process = require('process');

async function readFiles() {
  try {
    const files = await fs.readdir(pathToSecretFolder, { withFileTypes: true });
    files.forEach(async file => {
      if (file.isFile()) {
        const name = getName(file.name);
        const ext = getExt(file.name);
        const stat = await fs.stat(path.resolve(pathToSecretFolder, file.name));
        const size = getSize(stat.size);
        process.stdout.write(`${name} - ${ext} - ${size}\n`);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function getName(name) {
  const regex = /^.*(?=\..+$)/;
  const fullName = regex.exec(name);

  if (fullName) {
    return fullName[0];
  }
}

function getExt(name) {
  const regex = /[^.]+$/;
  const ext = regex.exec(name);

  if (ext) {
    return ext[0];
  }
}

function getSize(size) {
  const BYTES_IN_KB = 1024;
  const NUMBER_AFTER_POINT = 3;

  return (size / BYTES_IN_KB).toFixed(NUMBER_AFTER_POINT) + 'kb';
}

readFiles();
