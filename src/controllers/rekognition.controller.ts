import * as AWS from 'aws-sdk';

class Rekognition extends AWS.Rekognition {
  constructor() {
    super()
  }
  async searchFace(imageUrl: string) {
    const params = {
      CollectionId: process.env.AWS_REKOGNITION_COLLECTION,
      FaceMatchThreshold: 95,
      MaxFaces: 3,
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET,
          Name: imageUrl
        }
      }
    };
    return await this.searchFacesByImage(params).promise();
  }

  async registerFace(imageName: string, imageId: string) {
    let data = null;
    const params = {
      CollectionId: process.env.AWS_REKOGNITION_COLLECTION,
      DetectionAttributes: ["DEFAULT"],
      ExternalImageId: imageId.replace(/["']/g, ""),
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET,
          Name: imageName
        }
      }
    };
    console.log(params);

    return await this.indexFaces(params).promise();
  }

  // List all of your available buckets in this AWS Region.
  async listMyBuckets() {
    const s3 = new AWS.S3();
    return await s3.listBuckets().promise();
  }
}

export default Rekognition;