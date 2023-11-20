process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

import express from 'express';
import router from './routes/router.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`SERVER STARTED AT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp();
