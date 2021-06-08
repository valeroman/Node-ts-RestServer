"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const uploads_1 = require("../controllers/uploads");
const helpers_1 = require("../helpers");
const router = express_1.Router();
router.post('/', middlewares_1.validateFileUpload, uploads_1.loadFile);
router.put('/:coleccion/:id', [
    middlewares_1.validateFileUpload,
    express_validator_1.check('id', 'El id debe de ser de mongo').isMongoId(),
    express_validator_1.check('coleccion').custom(c => helpers_1.collectionsAllowed(c, ['users', 'products'])),
    middlewares_1.validField
], uploads_1.updateImagenCloudinary);
// ], updateImagen);
router.get('/:coleccion/:id', [
    express_validator_1.check('id', 'El id debe de ser de mongo').isMongoId(),
    express_validator_1.check('coleccion').custom(c => helpers_1.collectionsAllowed(c, ['users', 'products'])),
    middlewares_1.validField
], uploads_1.showImagen);
exports.default = router;
//# sourceMappingURL=uploads.js.map