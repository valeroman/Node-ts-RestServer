"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validField = void 0;
const express_validator_1 = require("express-validator");
exports.validField = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
//# sourceMappingURL=Valid-field.js.map