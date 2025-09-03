"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String }
});
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
//# sourceMappingURL=category.model.js.map