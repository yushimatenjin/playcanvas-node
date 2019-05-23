const fs = require("fs");

export const Save = (path: string, body: any) => {
  fs.writeFileSync(path, body);
};
