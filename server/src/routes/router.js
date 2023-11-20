import ImageController from '../controllers/ImageController.js';
import multer from 'multer';
import { Router } from 'express';

const upload = multer({ dest: 'uploads/' });
const router = new Router();

router.get('/images/:key', ImageController.getOne);

router.post('/images', upload.single('image'), ImageController.create);

export default router;
