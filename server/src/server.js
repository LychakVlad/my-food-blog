import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.js';
import cors from 'cors';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const PORT = 3001;
const DB_URL =
  
const app = express();

app.use(express.json());
app.use('/api', router);
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/images', upload.single('image'), (req, res) => {
  const file = req.file;
  console.log(file);
  const description = req.body.description;
  res.send('OK');
});

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`SERVER STARTED AT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();
