"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_1 = require("../controllers/product");
const db_validators_1 = require("../helpers/db-validators");
const middlewares_1 = require("../middlewares");
const valid_role_1 = require("../middlewares/valid-role");
const router = express_1.Router();
router.get('/', product_1.getProducts);
router.get('/:id', [
    express_validator_1.check('id', 'ID not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.isValidProductById),
    middlewares_1.validField
], product_1.getProduct);
router.post('/', [
    middlewares_1.validateJWT,
    express_validator_1.check('name', 'The name is required').not().isEmpty(),
    express_validator_1.check('category', 'ID not valid Mongo').isMongoId(),
    express_validator_1.check('category').custom(db_validators_1.isValidCategoryById),
    middlewares_1.validField
], product_1.createProduct);
router.put('/:id', [
    middlewares_1.validateJWT,
    express_validator_1.check('id').custom(db_validators_1.isValidProductById),
    middlewares_1.validField
], product_1.updateProduct);
router.delete('/:id', [
    middlewares_1.validateJWT,
    valid_role_1.isAdminRole,
    express_validator_1.check('id', 'ID not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.isValidProductById),
    middlewares_1.validField
], product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.js.map