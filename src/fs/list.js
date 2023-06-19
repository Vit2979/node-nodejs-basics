import { fileURLToPath } from "url";
import { access } from "fs/promises";
import { readdir } from "fs/promises";
import * as path from "path";

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dirPath = path.join(__dirname, "files");

  const listDirectory = async () => {
    try {
      const files = await readdir(dirPath);
      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        console.log(`${path.parse(filePath).name}`);
      });
    } catch (err) {
      if (err) throw err;
    }
  };

  try {
    await access(dirPath);
    listDirectory();
  } catch {
    console.log("Error FS operation failed");
  }
};

await list();
