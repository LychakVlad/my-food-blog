import { Router } from 'express';
import PostController from '../controllers/PostController.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = new Router();

router.post('/images', upload.single('image'), async (req, res) => {
  try {
    res.send('OK');
  } catch (error) {
    res.send(error);
  }
});

export default router;
