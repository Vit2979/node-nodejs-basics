import { fileURLToPath } from 'url';
import * as path from 'path';
import * as childProcess from 'child_process';

const spawnChildProcess = async (args) => {
    args.splice(0, 2);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'script.js');
    const ch = childProcess.fork(filePath, args, { silent: true });
    process.stdout.write('Enter your text or press "ctrl + c" to quit\n');
    process.stdin.pipe(ch.stdin);
    ch.stdout.pipe(process.stdout);
    ch.stdout.on('data', data => {
      const message = `Received from child stdout: ${data}`;
      process.stdout.write(message);
    });
};

// Put your arguments in function call to test this functionality
spawnChildProcess( process.argv);
