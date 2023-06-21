    import { fileURLToPath } from "url";
    import fs from "fs";
    import * as zlib from "zlib";
    import * as path from "path";
    
    const compress = async () => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const fileRead = path.join(__dirname, "files", "fileToCompress.txt");
      const fileWrite = path.join(__dirname, "files", "archive.gz");
    
      const gz = zlib.createGzip();
    
      const readStream = fs.createReadStream(fileRead);
      const writableStream = fs.createWriteStream(fileWrite);
      readStream.pipe(gz).pipe(writableStream);
};

await compress();