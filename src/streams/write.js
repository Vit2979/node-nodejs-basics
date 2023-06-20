import { fileURLToPath } from "url";
import * as readline from "readline";
import fs from "fs";
import * as path from "path";

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToWrite = path.join(__dirname, "files", "fileToWrite.txt");
  const writableStream = fs.createWriteStream(fileToWrite);

  writableStream.on("error", (err) => {
    console.log(
      `An error occurred while writing to the file. Error: ${err.message}`
    );
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter your text or press "ctrl + c" to quit:\n',
  });

  rl.prompt();

  rl.on("line", (line) => {
    const offer = line + "\n";
    writableStream.write(offer);
    rl.prompt();
  });
};

await write();
