import { fileURLToPath } from "url";
import { access } from "fs/promises";
import { mkdir } from "fs/promises";
import { copyFile } from "fs/promises";
import { readdir } from "fs/promises";
import * as path from "path";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const prevDir = path.join(__dirname, "files");
  const newDir = path.join(__dirname, "files_copy");
  const errMsg = () => console.log("Error FS operation failed");

  const copyDirectory = async () => {
    try {
      await mkdir(newDir, {
        recursive: true,
      });
      const files = await readdir(prevDir);
      for (let file of files) {
        let prevFilePath = path.join(prevDir, file);
        let nextFilePath = path.join(newDir, file);
        copyFile(prevFilePath, nextFilePath);
      }
    } catch (err) {
      if (err) throw err;
    }
  };

  try {
    await access(prevDir);
    try {
      await access(newDir);
      errMsg();
    } catch {
      copyDirectory();
    }
  } catch {
    errMsg();
  }
};

await copy();
