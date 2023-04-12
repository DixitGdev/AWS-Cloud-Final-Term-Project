import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http'

import postRoutes from './routes/postRoutes.js';
import downloadRoutes from './routes/downloadRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json({ limit: '60mb' }));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/download', downloadRoutes)


const PORT = process.env.PORT || 8080;

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// HOME ROUTE GET REQUEST
app.get('/', async (req, res) => {  
  res.status(200).json({
    message: 'Hello from PixelPen - Backend Server is running fine 🟢',
  });
});


const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

const handler = serverless(app);
export {handler};