import * as AWS from 'aws-sdk';
import * as mime from 'file-type'

class Bucket extends AWS.S3 {
  constructor() {
    super()
  }

  async putImage(identifier:string, base64file:string){
    // const file = new Buffer(base64file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    const file = await Buffer.from(base64file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    const fileTyle = mime(file);

    var params = {
      Body: file,
      Bucket: process.env.AWS_S3_BUCKET,
      ContentType: fileTyle.mime,
      Key: identifier
    };
    let data = await this.putObject(params).promise();
    data["key"] = identifier;
    return data;
  }

}

export default Bucket;

