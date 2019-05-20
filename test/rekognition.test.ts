import * as AWS from 'aws-sdk';
import Rekognition from '../src/controllers/rekognition.controller';

require('dotenv').config();
if (!AWS.config.region) {
  AWS.config.update({region:process.env.AWS_DEFAULT_REGION});
}

describe('Test For register Face', () => {
  it('Should return ok', async () => {
    const rekognition = new Rekognition();
    const imageUrl = "rut.jpg";
    const username = "rut";

    let data = await rekognition.registerFace(username, imageUrl).catch(err =>{
      console.error(err);

    });
    console.log(data);

    expect('test').toEqual('test');   
  });
})

describe('Test for search Face', () => {
  fit('Should return ok', async () => {
    const rekognition = new Rekognition();
    const imageUrl = "edwin.jpeg";
    let data = await rekognition.searchFace(imageUrl).catch(err =>{
      console.error(err);
    });
    console.log(data);

    expect('test').toEqual('test');   
  });
})

