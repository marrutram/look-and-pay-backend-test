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
  it('Should return ok', async () => {
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
    expect(bitmap).toBeDefined();
    await fs.writeFileSync(`${folderPictures}/base64/${imageUrl}-ignore.log`, bitmap, 'utf-8');

    userData.urlImagen = bitmap;
    const imageName = camelCase(`${userData.name}${userData.lastnanme}${userData.email}`);
    // const imageUploaded = await bucket.putImage(imageName, userData.urlImagen);
    const imageUploaded = { "ETag": '"8f905c0a9397c81249bd6079e96f64f7"', "key": 'carolynbravocarolynBravoGmailCom.png' }
    expect(imageUploaded.key).toBeDefined();
    expect(imageUploaded.ETag).toBeDefined();
    let data = await rekognition.registerFace(imageUploaded.key, imageUploaded.ETag)
    let faces = data.FaceRecords.map((elem: object) => elem["Face"]["FaceId"]);
    expect(data.FaceRecords).toBeDefined();
  });
})

describe('Test for search Face', () => {
  fit('Should return ok', async () => {
    const rekognition = new Rekognition();
    const bucket = new Bucket();
    const folderPictures = path.join(__dirname, 'images')
    const imageUrl = "caro-pago.jpeg";

    const bitmap = await fs.readFileSync(`${folderPictures}/pictures/${imageUrl}`, {encoding: 'base64'});
    expect(bitmap).toBeDefined();
    await fs.writeFileSync(`${folderPictures}/base64/${imageUrl}-ignore.log`, bitmap, 'utf-8');
    const date = new Date();
    const imageName = `${date.getTime()}-${imageUrl.split(".")[0]}`;
    // const imageUploaded = await bucket.putImage(imageName, bitmap, "payment");
    // expect(imageUploaded.key).toBeDefined();
    // expect(imageUploaded.ETag).toBeDefined();
    let data = await rekognition.searchFace("1558550390040-caro-pago.jpg");
    console.log(JSON.stringify(data));
    expect('test').toEqual('test');   
  });
})


