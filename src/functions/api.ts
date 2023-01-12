import { randomBytes } from "crypto";

/**
 * Function to generate the API Key.
 * @returns API Key
 */
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
