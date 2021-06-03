import { Router } from 'express';
import { check } from 'express-validator';
import { getProducts, getProduct, updateProduct, createProduct, deleteProduct } from '../controllers/product';
import { isValidProductById, isValidCategoryById } from '../helpers/db-validators';
import { validField, validateJWT } from '../middlewares';
import { isAdminRole } from '../middlewares/valid-role';


const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(isValidProductById),
    validField
], getProduct);

router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'ID not valid Mongo').isMongoId(),
    check('category').custom(isValidCategoryById),
    validField
], createProduct);

router.put('/:id', [
    validateJWT,
    check('id').custom(isValidProductById),
    validField
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(isValidProductById),
    validField
], deleteProduct);

export default router;