"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const categories_1 = require("../controllers/categories");
const db_validators_1 = require("../helpers/db-validators");
const router = express_1.Router();
// 
// {{url}}/api/category
// 
router.get('/', categories_1.getCategories);
router.get('/:id', [
    express_validator_1.check('id', 'ID not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.isValidCategoryById),
    middlewares_1.validField
], categories_1.getCategory);
router.post('/', [
    middlewares_1.validateJWT,
    express_validator_1.check('name', 'The name is required').not().isEmpty(),
    middlewares_1.validField
], categories_1.createCategory);
router.put('/:id', [
    middlewares_1.validateJWT,
    express_validator_1.check('name', 'The name is required').not().isEmpty(),
    express_validator_1.check('id').custom(db_validators_1.isValidCategoryById),
    middlewares_1.validField
], categories_1.updateCategory);
router.delete('/:id', [
    middlewares_1.validateJWT,
    middlewares_1.isAdminRole,
    express_validator_1.check('id', 'ID not valid').isMongoId(),
    express_validator_1.check('id').custom(db_validators_1.isValidCategoryById),
    middlewares_1.validField
], categories_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.js.map