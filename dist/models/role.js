"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: [true, 'The role is required']
    }
});
const role = mongoose_1.model('Role', RoleSchema);
exports.default = role;
//# sourceMappingURL=role.js.map