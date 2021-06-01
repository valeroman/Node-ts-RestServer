"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const Valid_field_1 = require("../middlewares/Valid-field");
const router = express_1.Router();
router.post('/login', [
    express_validator_1.check('email', 'The email is not valid').isEmail(),
    express_validator_1.check('password', 'The password is required').not().isEmpty(),
    Valid_field_1.validField
], auth_1.login);
router.post('/google', [
    express_validator_1.check('id_token', 'The id_token is required').not().isEmpty(),
    Valid_field_1.validField
], auth_1.googleSignin);
exports.default = router;
//# sourceMappingURL=auth.js.map