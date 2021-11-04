const fs = require('fs').promises;
const path = require('path');
const pathToFiles = path.join(__dirname, 'files');
const pathToCopyFiles = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(pathToCopyFiles, { recursive: true });
    const copyFiles = await fs.readdir(pathToCopyFiles);
    removeFiles(copyFiles);
    const files = await fs.readdir(pathToFiles);

    files.forEach(async file => {
      try {
        await fs.copyFile(
          path.resolve(pathToFiles, file),
          path.resolve(pathToCopyFiles, file)
        );
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function removeFiles(files) {
  if (files.length) {
    files.forEach(async file => {
      try {
        await fs.unlink(path.resolve(pathToCopyFiles, file));
      } catch (err) {
        console.log(err);
      }
    });
  }
}

copyDir();
