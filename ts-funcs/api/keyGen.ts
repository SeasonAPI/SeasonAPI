import * as crypto from "crypto";

// Function to generate a new API key
function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

export { generateApiKey };
