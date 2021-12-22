import fs from "fs";
import path from "path";

class FileReader {
  static async writeFileToRoot(
    catalog: string,
    file: string,
    data: any
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "..", catalog, file),
        JSON.stringify(data),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async readFileFromRoot(
    catalog: string,
    file: string
  ): Promise<object> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "..", catalog, file),
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            //   TODO mistake
            resolve(data);
          }
        }
      );
    });
  }
}

export default FileReader;
