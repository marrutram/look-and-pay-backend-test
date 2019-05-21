import * as AWS from 'aws-sdk';
import Bucket from '../src/controllers/bucket.controller';
import * as fs from 'fs';
import * as path from 'path';

jest.setTimeout(30000); // Only for s3 upload 

require('dotenv').config();
if (!AWS.config.region) {
  AWS.config.update({region:process.env.AWS_DEFAULT_REGION});
}

fdescribe('Test Upload image to S3', () => {
  fit('Should return ok', async () => {
    const bucket = new Bucket();
    const imageUrl = "juana.jpg";
    const folderPictures = path.join(__dirname, '../../pictures/free')
    
    const bitmap = await fs.readFileSync(`${folderPictures}/${imageUrl}`, {encoding: 'base64'});
    expect(bitmap).toBeDefined();

    const imageUploaded = await bucket.putImage(imageUrl, bitmap)
    expect(imageUploaded).toBeDefined();
  });
})
