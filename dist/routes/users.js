"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// import { validateJWT } from '../middlewares/validate-jwt';
// import { isAdminRole, tieneRole } from '../middlewares/valid-role';
// import { validField } from '../middlewares/valid-field';
const index_1 = require("../middlewares/index");
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
    index_1.validField
], users_1.userPost);
router.put('/:id', [
    express_validator_1.check('id', 'ID not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.isValidUserById),
    index_1.validField
], users_1.userPut);
router.patch('/', users_1.userPatch);
router.delete('/:id', [
    index_1.validateJWT,
    // isAdminRole,
    index_1.tieneRole(['ADMIN_ROLE', 'SALES_ROLE', 'OTHER_ROLE']),
    express_validator_1.check('id', 'ID not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.isValidUserById),
    index_1.validField
], users_1.userDelete);
exports.default = router;
//# sourceMappingURL=users.js.map