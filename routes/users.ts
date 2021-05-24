import { Router } from 'express';
import { usersGet, userPost, userPut, userPatch, userDelete } from '../controllers/users';

const router = Router();

router.get('/', usersGet);

router.post('/', userPost);

router.put('/:id', userPut);

router.patch('/', userPatch);

router.delete('/', userDelete);

export default router;

