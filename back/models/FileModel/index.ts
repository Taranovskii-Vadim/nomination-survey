import fs from 'fs';
import path from 'path';

type FileName = 'users' | 'surveys' | 'questions' | string;

class FileModel {
  static setData = async <T extends object>(file: FileName, data: T): Promise<T> =>
    new Promise((resolve, reject) =>
      fs.writeFile(path.join(__dirname, '..', '..', 'database', `${file}.json`), JSON.stringify(data), (e) =>
        e ? reject(e) : resolve(data),
      ),
    );

  static getData = async <T extends object>(file: FileName): Promise<T> =>
    new Promise((resolve, reject) =>
      fs.readFile(path.join(__dirname, '..', '..', 'database', `${file}.json`), (e, data) => {
        const isError = e && e.code !== 'ENOENT';
        const isNotFile = e && e.code === 'ENOENT';

        if (isError) {
          return reject(e);
        }

        return resolve(!isNotFile && JSON.parse(data.toString()));
      }),
    );
}

export default FileModel;
