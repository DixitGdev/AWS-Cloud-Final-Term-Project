import express, { raw } from 'express';
import * as dotenv from 'dotenv';
import AWS from 'aws-sdk';
import axios from 'axios';

dotenv.config();

const router = express.Router();
const s3 = new AWS.S3();

router.route('/').post(async (req, res) => {
    try {
      const params = { Bucket: process.env.AWS_S3_BUCKET };
      const subject = 'Pixelpen | Your files are ready to download ⬇️';
      const data = req.body;
      const email = data.email;
    
        // Get URLs
      const emailPromise = new Promise((resolve, reject) => {
        s3.listObjects(params, (err, data) => {
          if (err) {
            reject({ success: false, message: 'Error is downloading' });
          } else {
            const images = data.Contents.filter((item) => /\.(jpg|jpeg|png|gif)$/.test(item.Key)).map((image) => {
              return {
                url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${image.Key}`,
              };
            });
  
            // SEND EMAIL - MAKING POST REQUEST TO API GATEWAY
            // TODO: Need to change API GATEWAY URL
            
            axios.post(`${process.env.GATEWAY_URL}`, {
              userEmail: email,
              subject: subject,
              text: `Here are your image URLs: ${images.map((image) => image.url).join(', ')}`,
            })
              .then((response) => {
                console.log(response.data);
                alert("Sent!")
                resolve({ success: true, message: 'Email sent successfully' });
              })
              .catch((error) => {
                alert("Sent!")
                console.log('Error sending email:', error);
                reject({ success: false, message: 'Error sending email' });
              });
          }
        });
      });
  
      const emailResponse = await emailPromise;
      res.status(emailResponse.success ? 200 : 500).json(emailResponse);
    } catch (error) {
      alert("Sent!")
      console.log('Error:', error);
      res.status(500).send('Something went wrong');
    }
  });
  
  router.route('/').get(async (req, res) => {
    res.status(500).send('NOT A VALID METHOD :) ');
  });
  
  export default router;