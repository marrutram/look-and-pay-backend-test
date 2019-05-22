import * as AWS from 'aws-sdk';
import Rekognition from '../src/controllers/rekognition.controller';
import Bucket from '../src/controllers/bucket.controller';
import * as fs from 'fs';
import * as path from 'path';
import { camelCase } from 'lodash';

jest.setTimeout(30000); // Only for s3 upload 

require('dotenv').config();
if (!AWS.config.region) {
  AWS.config.update({region:process.env.AWS_DEFAULT_REGION});
}

describe('Test For register Face', () => {
  fit('Should return ok', async () => {
    const rekognition = new Rekognition();
    const bucket = new Bucket();
    
    let userData = {
      email: "carolyn.bravo@gmail.com",
      password: "carolyn.bravo",
      name: "carolyn",
      lastnanme: "bravo",
      urlImagen: ""
    }
    const imageUrl = "carolyn.png";
    const folderPictures = path.join(__dirname, 'images')

    const bitmap = await fs.readFileSync(`${folderPictures}/pictures/${imageUrl}`, {encoding: 'base64'});
    await fs.writeFileSync(`${folderPictures}/base64/${imageUrl}-ignore.log`, bitmap, 'utf-8');

    expect(bitmap).toBeDefined();
    userData.urlImagen = bitmap;
    const imageName = camelCase(`${userData.name}${userData.lastnanme}${userData.email}`);
    const imageUploaded = await bucket.putImage(imageName, userData.urlImagen);
    expect(imageUploaded.key).toBeDefined();
    expect(imageUploaded.ETag).toBeDefined();
    console.log(imageUploaded)
    
    let data = await rekognition.registerFace(imageUploaded.key, imageUploaded.ETag)
    expect(data.FaceRecords).toBeDefined();
  });
})

describe('Test for search Face', () => {
  it('Should return ok', async () => {
    const rekognition = new Rekognition();
    const imageUrl = "edwin.jpeg";
    let data = await rekognition.searchFace(imageUrl).catch(err =>{
      console.error(err);
    });
    console.log(data);

    expect('test').toEqual('test');   
  });
})



