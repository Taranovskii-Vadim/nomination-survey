import fs from "fs";
import path from "path";

import { User } from "./types";

class UserModel {
  static async getData(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.resolve(path.resolve("database", "users.json")),
        (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(data.toString()));
        }
      );
    });
  }
}

export default UserModel;
