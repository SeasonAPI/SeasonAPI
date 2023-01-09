import { randomBytes } from "crypto";

const generateApiKey = () => {
  return new Promise((resolve, reject) => {
    randomBytes(32, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer.toString("hex"));
    });
  });
};

export { generateApiKey };
