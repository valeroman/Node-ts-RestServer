"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const valid_role_1 = require("../middlewares/valid-role");
const valid_field_1 = __importDefault(require("../middlewares/valid-field"));
const users_1 = require("../controllers/users");
const db_validators_1 = require("../helpers/db-validators");
const router = express_1.Router();
router.get('/', users_1.usersGet);
router.post('/', [
    express_validator_1.check('name', 'The name is required').not().isEmpty(),
    express_validator_1.check('password', 'The password must be 6 letters').isLength({ min: 6 }),
    express_validator_1.check('email', 'The email is not valid').isEmail(),
    express_validator_1.check('email').custom(db_validators_1.isValidEmail),
    // check('role', 'The role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    express_validator_1.check('role').custom(db_validators_1.isValidRole),
    valid_field_1.default
], users_1.userPost);
router.put('/:id', [
    express_validator_1.check('id', 'ID not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.isValidUserById),
    valid_field_1.default
], users_1.userPut);
router.patch('/', users_1.userPatch);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
    // isAdminRole,
    valid_role_1.tieneRole(['ADMIN_ROLE', 'SALES_ROLE', 'OTHER_ROLE']),
    express_validator_1.check('id', 'ID not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.isValidUserById),
    valid_field_1.default
], users_1.userDelete);
exports.default = router;
//# sourceMappingURL=users.js.map