import fs from "fs";
import path from "path";

import { SurveyDataBase } from "./types";

class Survey {
  static async getData(): Promise<SurveyDataBase[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.resolve(path.resolve("database", "surveys.json")),
        (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(data.toString()));
        }
      );
    });
  }

  static async writeData(data: SurveyDataBase[]): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.resolve("database", "surveys.json"),
        JSON.stringify(data),
        (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }
}

export default Survey;
