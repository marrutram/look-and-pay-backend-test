import * as AWS from 'aws-sdk';
import * as mime from 'file-type';
import * as isBase64 from 'is-base64';
import { logger } from '../logger';

class Bucket extends AWS.S3 {
  constructor() {
    super()
  }

  async putImage(identifier:string, base64file:string, type?:string){
    let data = null;
    let bucket =  process.env.AWS_S3_BUCKET;
    if (!isBase64(base64file, {mime: true})) {
      throw new Error("The user's image should be a base64 file");
    }

    if (type === "payment"){
      bucket = process.env.AWS_S3_BUCKET_PAYMENT;
    }
    const file = await Buffer.from(base64file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    const fileTyle = mime(file);
    identifier = `${identifier}.${fileTyle.ext}`
    var params = {
      ACL: "public-read",
      Body: file,
      Bucket: bucket,
      ContentType: fileTyle.mime,
      Key: identifier
    };
    try {
      logger.log({level: 'info', message: 'Bucket - putImage', additional: params });
      data = await this.putObject(params).promise();
    } catch (err) {
      throw new Error(err.message); 
    }
    
    if (!("ETag" in data)) {
      throw new Error("Error push image to S3"); 
    }
    data["key"] = identifier;
    return data;
  }

}

export default Bucket;

