import { fileURLToPath } from "url";
import { access } from "fs/promises";
import { appendFile } from "fs/promises";
import * as path from "path";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const FileCreation = path.join(__dirname, "files", "fresh.txt");
  try {
    await access(FileCreation);
    console.log("FS operation failed");
  } catch {
    appendFile(FileCreation, "I am fresh and young");
  }
};

await create();
