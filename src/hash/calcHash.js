import { fileURLToPath } from "url";
import { createReadStream } from "fs";
import { stdout } from "process";
import * as path from "path";

const { createHash } = await import("crypto");
const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const file = path.join(__dirname, "files", "fileToCalculateHashFor.txt");
  const data = createHash("sha256");
  const readStream = createReadStream(file);

  readStream.pipe(data).setEncoding("hex").pipe(stdout);
};

await calculateHash();
