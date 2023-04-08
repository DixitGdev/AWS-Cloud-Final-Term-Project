import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import serverless from 'serverless-http'

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// TODO : NEED TO CHANGE THIS ROUTE
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from PixelPen',
  });
});

const startServer = async () => {
  try {
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();

const handler = serverless(app);
export {handler};