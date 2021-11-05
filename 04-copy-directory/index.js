const fs = require('fs').promises;
const path = require('path');
const pathToFiles = path.join(__dirname, 'files');
const pathToCopyFiles = path.join(__dirname, 'files-copy');

async function copyDir(copyFrom, copyTo) {
  try {
    await fs.mkdir(copyTo, { recursive: true });
    await removeFiles(copyTo);
    const allFiles = await fs.readdir(copyFrom, { withFileTypes: true });
    const files = allFiles.filter(file => file.isFile());
    const folders = allFiles.filter(file => file.isDirectory());
    if (files.length) {
      copyFiles(files, copyFrom, copyTo);
    }

    if (folders.length) {
      copyFolder(folders, copyFrom, copyTo);
    }
  } catch (err) {
    console.log(err);
  }
}

async function removeFiles(copyTo) {
  try {
    const files = await fs.readdir(copyTo, { withFileTypes: true });
    if (files.length) {
      files.forEach(async file => {
        try {
          const pathToFile = path.resolve(copyTo, file.name);
          if (file.isDirectory()) {
            await removeDirectory(pathToFile);
          } else {
            await fs.unlink(pathToFile);
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function removeDirectory(pathToDir) {
  try {
    const innerFiles = await fs.readdir(pathToDir, { withFileTypes: true });
    if (innerFiles.length) {
      await removeFiles(pathToDir);
    } else {
      await fs.rmdir(pathToDir);
    }
  } catch (err) {
    console.log(err);
  }
}

function copyFiles(files, copyFrom, copyTo) {
  files.forEach(async file => {
    try {
      await fs.mkdir(copyTo, { recursive: true });
      await fs.copyFile(
        path.resolve(copyFrom, file.name),
        path.resolve(copyTo, file.name)
      );
    } catch (err) {
      console.log(err);
    }
  });
}

function copyFolder(folders, copyFrom, copyTo) {
  folders.forEach(async folder => {
    try {
      await copyDir(
        path.resolve(copyFrom, folder.name),
        path.resolve(copyTo, folder.name)
      );
    } catch (err) {
      console.log(err);
    }
  });
}

copyDir(pathToFiles, pathToCopyFiles);
