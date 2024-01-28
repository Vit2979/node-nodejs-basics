import { fileURLToPath } from "url";
import fs from "fs";
import { open } from "fs/promises";
import * as zlib from "zlib";
import * as path from "path";

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileRead = path.join(__dirname, "files", "archive.gz");
  const fileWrite = path.join(__dirname, "files", "fileToCompress.txt");
  const writableStream = fs.createWriteStream(fileWrite);
  const fd = await open(fileRead);
  const readStream = fd.createReadStream();

  readStream.on("data", (ch) => {
    zlib.unzip(ch, function (err, res) {
      if (err) return console.log("error " + err);
      writableStream.write(res);
    });
  });
};

await decompress();