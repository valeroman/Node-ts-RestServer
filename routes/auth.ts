import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth';
import { validField } from '../middlewares/valid-field';

const router = Router();

router.post('/login', [
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validField
], login)

export default router;