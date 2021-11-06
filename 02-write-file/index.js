const readline = require('readline');
const path = require('path');
const process = require('process');
const fs = require('fs');
const pathToOutPutFile = path.join(__dirname, 'answer.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.write('Name your favorite movies:\n');
rl.on('line', createLine);
rl.on('close', close);
process.on('SIGINT', close);

function createLine(line) {
  const answer = line.trim().toLowerCase();
  if (answer === 'exit') {
    rl.close();
  } else {
    appendFile(answer + '\n');
  }
}

function appendFile(input) {
  fs.appendFile(pathToOutPutFile, input, function (err) {
    if (err) {
      throw err;
    }
  });
}

function close() {
  rl.removeListener('line', createLine);
  rl.write('We are done for today. Bye-bye!\n');
  rl.pause();
}
