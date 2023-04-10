import express from 'express';
import * as dotenv from 'dotenv';
import AWS from 'aws-sdk';

dotenv.config();

const router = express.Router();

  AWS.config.update({
    region :          process.env.AWS_REGION,
    accessKeyId :     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken :    process.env.AWS_SESSION_TOKEN
  });


const s3 = new AWS.S3();

async function uploadImageToS3(base64Image, userName, prompt){
  const buffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const key = `images/${Date.now()}-${userName}.jpg`;

  const params = {
    Bucket: "dixit-image-store",
    Key: key,
    Body: buffer,
    ContentType: 'image/jpeg',
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location;
}

// TODO: GET ALL POST FROM S3 AND SEND RESPONSE BACK TO THE HOME PAGE
router.route('/').get(async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET
    }
    s3.listObjects(params, (err, data) => {
      if(err){
        res.status(500).json({ success: false, message: 'Error in listing images'})
      } else {
        const images = data.Contents.filter((item) => /\.(jpg|jpeg|png|gif)$/.test(item.Key)).map((image) => {
          return {
            url: `https://${"dixit-image-store"}.s3.${process.env.AWS_REGION}.amazonaws.com/${image.Key}`,
            key: image.Key,
            };
          });
          res.header('Access-Control-Allow-Origin', '*');
      res.status(200).json({ success: true, data: images });
    }
  });    
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});


// TODO: UPLOAD GENERATED IMAGE TO S3 AND RETURN URL OF IMAGE, SO WE CAN STORE IT
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await uploadImageToS3(photo, name, prompt);

    res.status(200).json({ success: true, data: photoUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

export default router;