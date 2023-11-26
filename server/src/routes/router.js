import ImageController from '../controllers/ImageController.js';
import multer from 'multer';
import { Router } from 'express';

const upload = multer({ dest: 'uploads/' });
const router = new Router();

router.get('/test', (req, res) => {
  res.send('<p>Test is good</p>');
});

router.get('/images/:key', ImageController.getOne);

router.delete('/images/:key', ImageController.deleteOne);

router.post('/images', upload.single('image'), ImageController.create);

export default router;
