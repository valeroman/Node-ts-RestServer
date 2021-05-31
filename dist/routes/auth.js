"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const valid_field_1 = require("../middlewares/valid-field");
const router = express_1.Router();
router.post('/login', [
    express_validator_1.check('email', 'The email is not valid').isEmail(),
    express_validator_1.check('password', 'The password is required').not().isEmpty(),
    valid_field_1.validField
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map