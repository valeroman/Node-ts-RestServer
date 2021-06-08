import { Router } from 'express';
import { check } from 'express-validator';
import { validateFileUpload, validField } from '../middlewares';
import { updateImagen, loadFile, showImagen, updateImagenCloudinary } from '../controllers/uploads';
import { collectionsAllowed } from '../helpers';



const router = Router();

router.post('/', validateFileUpload, loadFile);

router.put('/:coleccion/:id', [
    validateFileUpload,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validField
], updateImagenCloudinary);
// ], updateImagen);

router.get('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => collectionsAllowed(c, ['users', 'products'])),
    validField
], showImagen);

export default router; 