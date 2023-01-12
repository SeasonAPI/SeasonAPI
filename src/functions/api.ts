import { randomBytes } from "crypto";

/**
 * Function to generate the API Key.
 * @returns API Key
 */
import * as crypto from "crypto";

function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}
export { generateApiKey };
