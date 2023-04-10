import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http'

import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();
const app = express();


app.use(cors({
  origin: ["http://pixelpen-frontend.s3-website-us-east-1.amazonaws.com", "http://d269jse5o9ufap.cloudfront.net"]
}));

app.use(express.json({ limit: '60mb' }));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


const PORT = process.env.PORT || 8080;

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// TODO : NEED TO CHANGE THIS ROUTE
app.get('/', async (req, res) => {  
  res.status(200).json({
    message: 'Hello from PixelPen',
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