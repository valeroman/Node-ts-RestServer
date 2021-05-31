import { Router } from 'express';
import { check } from 'express-validator';

// import { validateJWT } from '../middlewares/validate-jwt';
// import { isAdminRole, tieneRole } from '../middlewares/valid-role';
// import { validField } from '../middlewares/valid-field';

import {
    validField,
    validateJWT,
    isAdminRole,
    tieneRole
 } from '../middlewares' 

import { usersGet, userPost, userPut, userPatch, userDelete } from '../controllers/users';
import { isValidEmail, isValidRole, isValidUserById } from '../helpers/db-validators';




const router = Router();

router.get('/', usersGet);

router.post('/',[
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must be 6 letters').isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(isValidEmail),
    // check('role', 'The role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validField
], userPost);

router.put('/:id', [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(isValidUserById),
    validField
], userPut);

router.patch('/', userPatch);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    tieneRole(['ADMIN_ROLE', 'SALES_ROLE', 'OTHER_ROLE']),
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(isValidUserById),
    validField
], userDelete);

export default router;

