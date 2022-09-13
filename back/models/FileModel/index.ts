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
        (e, data) => {
          // TODO this function get data and check if file exists, S principle error
          // but code in survey router looks shorter
          const isError = e && e.code !== "ENOENT";
          const isNotFile = e && e.code === "ENOENT";

          if (isError) {
            return reject(e);
          }

          return resolve(!isNotFile && JSON.parse(data.toString()));
        }
      )
    );
}

export default FileModel;