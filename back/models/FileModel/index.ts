import fs from "fs";
import path from "path";

import { Catalog } from "../../types";

class FileModel {
  static async writeData<T extends object>(
    catalog: Catalog,
    file: string,
    data: T
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "..", catalog, file),
        JSON.stringify(data),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  static async getData<T extends object>(
    catalog: Catalog,
    file: string
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "..", catalog, file),
        (err, data: unknown) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data as string));
          }
        }
      );
    });
  }

  static async checkData(catalog: Catalog, file: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(
        path.join(__dirname, "..", "..", catalog, file),
        fs.constants.F_OK,
        (err) => {
          resolve(!err);
        }
      );
    });
  }
}

export default FileModel;
