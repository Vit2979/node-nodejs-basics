import { fileURLToPath } from "url";
import { access } from "fs/promises";
import { unlink } from "fs/promises";
import * as path from "path";

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToDelete = path.join(__dirname, "files", "fileToRemove.txt");
  try {
    await access(fileToDelete);
    unlink(fileToDelete);
  } catch {
    console.log("Error FS operation failed");
  }
};

await remove();
