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

  async registerFace(username: string, imageUrl: string) {
    let data = null;
    const params = {
      CollectionId: process.env.AWS_REKOGNITION_COLLECTION,
      DetectionAttributes: ["DEFAULT"],
      ExternalImageId: username,
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET,
          Name: imageUrl
        }
      }
    };

    // return await this.indexFaces(params).promise();
    return await { SearchedFaceBoundingBox:
      { Width: 0.4138587713241577,
        Height: 0.3723534047603607,
        Left: 0.2158493995666504,
        Top: 0.3478001058101654 },
     SearchedFaceConfidence: 100,
     FaceMatches: [],
     FaceModelVersion: '4.0' }
  }

  // List all of your available buckets in this AWS Region.
  async listMyBuckets() {
    const s3 = new AWS.S3();
    return await s3.listBuckets().promise();
  }
}

export default Rekognition;