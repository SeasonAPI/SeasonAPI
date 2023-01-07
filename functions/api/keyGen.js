"use strict";
/**
 * The `generateApiKey()` function is used to generate random API Keys with 32 characters
 * @example ```js
 * getApiKey();
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = void 0;
const crypto = require("crypto");
function generateApiKey() {
    return crypto.randomBytes(32).toString("hex");
}
exports.generateApiKey = generateApiKey;
//# sourceMappingURL=keyGen.js.map