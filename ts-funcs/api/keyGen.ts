/**
 * The `generateApiKey()` function is used to generate random API Keys with 32 characters
 */

import * as crypto from "crypto";

function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

export { generateApiKey };
