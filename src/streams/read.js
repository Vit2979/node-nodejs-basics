import { fileURLToPath } from "url";
import { open } from "fs/promises";
import * as path from "path";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToRead = path.join(__dirname, "files", "fileToRead.txt");
  const fd = await open(fileToRead);
  const ReadStream = fd.createReadStream();
  ReadStream.on("data", (ch) => {
    const textData = Buffer.from(ch).toString();
    process.stdout.write(textData + "\n");
  });
};

await read();
