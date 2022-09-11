import fs from "fs";
import path from "path";

class FileModel {
  static writeData = async <T extends object>(
    file: string,
    data: T
  ): Promise<T> =>
    new Promise((resolve, reject) =>
      fs.writeFile(
        path.join(__dirname, "..", "..", "database", file),
        JSON.stringify(data),
        (e) => (e ? reject(e) : resolve(data))
      )
    );

  static getData = async <T extends object>(file: string): Promise<T> =>
    new Promise((resolve, reject) =>
      fs.readFile(
        path.join(__dirname, "..", "..", "database", file),
        (e, data) =>
          // TODO check here if file exist
          e ? reject(e) : resolve(JSON.parse(data.toString()))
      )
    );

  static checkData = async (file: string): Promise<boolean> =>
    new Promise((resolve) =>
      fs.access(
        path.join(__dirname, "..", "..", "database", file),
        fs.constants.F_OK,
        (err) => resolve(!err)
      )
    );
}

export default FileModel;
