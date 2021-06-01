import { Router } from 'express';
import { check } from 'express-validator';
import { googleSignin, login } from '../controllers/auth';
import { validField }  from '../middlewares/Valid-field';

const router = Router();

router.post('/login', [
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validField
], login)

router.post('/google', [
    check('id_token', 'The id_token is required').not().isEmpty(),
    validField
], googleSignin)

export default router;