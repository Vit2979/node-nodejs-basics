import { Transform } from "stream";
import * as readline from "readline";

const transform = async () => {
  const readToLine = readline.createInterface({
    input: process.stdin,
  });

  const startMessage = 'Enter your text or press "ctrl + c" to quit:\n';
  process.stdout.write(startMessage);

  const flipStream = new Transform({
    transform(data) {
      const flipData = data.split("").reverse().join("");
      return flipData;
    },
  });

  readToLine.on("line", async (line) => {
    const message = await flipStream._transform(line);
    process.stdout.write(message);
    process.stdout.write(`\n${startMessage}`);
  });
};

await transform();
