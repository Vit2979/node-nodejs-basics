import { fileURLToPath } from "url";
import { access } from "fs/promises";
import { open } from "fs/promises";
import * as path from "path";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileRead = path.join(__dirname, "files", "fileToRead.txt");

  const readFile = async () => {
    const fd = await open(fileRead);
    const readStream = fd.createReadStream();
    readStream.on("data", (ch) => {
      const textData = "" + Buffer.from(ch);
      process.stdout.write(textData + "\n");
    });
  };

  try {
    await access(fileRead);
    readFile();
  } catch {
    console.log("Error FS operation failed");
  }
};

await read();
