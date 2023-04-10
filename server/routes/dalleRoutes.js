import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import AWS from 'aws-sdk';

dotenv.config();

const router = express.Router();

const sm = new AWS.SecretsManager({region: 'us-east-1'})

const getSecrets = (SecretId) => {
  return new Promise((resolve, reject) => {
    sm.getSecretValue({SecretId}, (err, result) => {
      if (err) reject(err)
      else resolve (JSON.parse(result.SecretString))
    })
  })
}

const retrieveSecret = (KeyValue,SecretName) => {
  return getSecrets(SecretName).then((res) => {
    return res[KeyValue]
  })
}

// AWS SECRET MANAGER //
let apiKey = await retrieveSecret('OPEN_AI_API_KEY', 'OpenAIKey')

const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

router.route('/').get(async (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
  
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;
