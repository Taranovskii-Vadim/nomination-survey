import fs from "fs";
import path from "path";

import { Catalog } from "../../types";

class FileModel {
  static writeData = async <T extends object>(
    catalog: Catalog,
    file: string,
    data: T
  ): Promise<T> =>
    new Promise((resolve, reject) =>
      fs.writeFile(
        path.join(__dirname, "..", "..", catalog, file),
        JSON.stringify(data),
        (e) => (e ? reject(e) : resolve(data))
      )
    );

  static getData = async <T extends object>(
    catalog: Catalog,
    file: string
  ): Promise<T> =>
    new Promise((resolve, reject) =>
      fs.readFile(path.join(__dirname, "..", "..", catalog, file), (e, data) =>
        // TODO check here if file exist
        e ? reject(e) : resolve(JSON.parse(data.toString()))
      )
    );

  static checkData = async (catalog: Catalog, file: string): Promise<boolean> =>
    new Promise((resolve) =>
      fs.access(
        path.join(__dirname, "..", "..", catalog, file),
        fs.constants.F_OK,
        (err) => resolve(!err)
      )
    );
}

export default FileModel;
