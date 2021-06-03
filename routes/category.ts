import { Router } from 'express';
import { check } from 'express-validator';
import { Request, Response } from "express";

import { validField, validateJWT, isAdminRole }  from '../middlewares';
import { 
    createCategory, 
    deleteCategory, 
    getCategories, 
    getCategory, 
    updateCategory
} from '../controllers/categories';
import { isValidCategoryById } from '../helpers/db-validators';

const router = Router();

// 
// {{url}}/api/category
// 

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(isValidCategoryById),
    validField
], getCategory);

router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validField
], createCategory);

router.put('/:id', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('id').custom(isValidCategoryById),
    validField
], updateCategory);

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(isValidCategoryById),
    validField
], deleteCategory);

export default router;