import fs from 'fs';
import path from 'path';

class ResultModel {
  static setData = async <T extends object>(id: number, data: T): Promise<T> =>
    new Promise((resolve, reject) =>
      fs.writeFile(path.join(__dirname, '..', '..', 'results', `survey${id}.json`), JSON.stringify(data), (e) =>
        e ? reject(e) : resolve(data),
      ),
    );

  static getData = async <T extends object>(id: number): Promise<T> =>
    new Promise((resolve, reject) =>
      fs.readFile(path.join(__dirname, '..', '..', 'results', `survey${id}.json`), (e, data) => {
        const isError = e && e.code !== 'ENOENT';
        const isNotFile = e && e.code === 'ENOENT';

        if (isError) {
          return reject(e);
        }

        return resolve(!isNotFile && JSON.parse(data.toString()));
      }),
    );
}

export default ResultModel;
