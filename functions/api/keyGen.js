"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = void 0;
const crypto = require("crypto");
// Function to generate a new API key
function generateApiKey() {
    return crypto.randomBytes(32).toString("hex");
}
exports.generateApiKey = generateApiKey;
//# sourceMappingURL=keyGen.js.map