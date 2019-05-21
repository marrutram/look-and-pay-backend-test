import * as AWS from 'aws-sdk';
import Bucket from '../src/controllers/bucket.controller';
import * as fs from 'fs';
import * as path from 'path';
import { camelCase } from 'lodash';

jest.setTimeout(30000); // Only for s3 upload 

require('dotenv').config();
if (!AWS.config.region) {
  AWS.config.update({region:process.env.AWS_DEFAULT_REGION});
}

fdescribe('Test Upload image to S3', () => {
  fit('Should return ok', async () => {
    const bucket = new Bucket();
    const folderPictures = path.join(__dirname, '../../pictures/free')
    let userData = {
      email: "martinezjuana@gmail.com",
      password: "",
      name: "juana",
      lastnanme: "martinez",
      urlImagen: ""
    }
    
    const bitmap = await fs.readFileSync(`${folderPictures}/juana.jpg`, {encoding: 'base64'});
    expect(bitmap).toBeDefined();

    userData.urlImagen = bitmap;
    const imageName = camelCase(`${userData.name}${userData.lastnanme}${userData.email}`);
    const imageUploaded = await bucket.putImage(imageName, userData.urlImagen);
    console.log(imageUploaded)
    expect(imageUploaded.key).toBeDefined();
  });

  it('Should return an error', async () => {
    const bucket = new Bucket();
    const folderPictures = path.join(__dirname, '../../pictures/free')
    let userData = {
      email: "martinezjuana@gmail.com",
      password: "",
      name: "juana",
      lastnanme: "martinez",
      urlImagen: ""
    }
    
    const bitmap = await fs.readFileSync(`${folderPictures}/juana.jpg`, {encoding: 'base64'});
    expect(bitmap).toBeDefined();

    userData.urlImagen = bitmap;
    const imageName = camelCase(`${userData.name}${userData.lastnanme}${userData.email}`);
    
    try {
      await bucket.putImage(imageName, "bitmap");
    } catch (err) {
      expect(err.message).toEqual("The user's image should be a base64 file");
    }
  });
})
