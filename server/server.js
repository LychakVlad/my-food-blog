import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';

const PORT = 3000;
const DB_URL = DB;
const app = express();

app.use(express.json());
app.use('/api', router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`SERVER STARTED AT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();
