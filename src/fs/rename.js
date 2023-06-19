import { fileURLToPath } from "url";
import { access } from "fs/promises";
import { rename as fsRename } from "fs/promises";
import * as path from "path";

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const wrongFile = path.join(__dirname, "files", "wrongFilename.txt");
  const properFile = path.join(__dirname, "files", "properFilename.md");

  const renameFile = async () => {
    try {
      fsRename(wrongFile, properFile);
    } catch (err) {
      if (err) throw err;
    }
  };

  const checkProperFile = async () => {
    try {
      await access(properFile);
      console.log("Error FS operation failed");
    } catch {
      renameFile();
    }
  };

  try {
    await access(wrongFile);
    checkProperFile();
  } catch {
    console.log("Error FS operation failed");
  }
};

await rename();
