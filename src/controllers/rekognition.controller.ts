import * as AWS from 'aws-sdk';
import { merge } from 'lodash';
import { logger } from '../logger';

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
    logger.log({level: 'info', message: 'Rekognition - searchFace', additional: params });
    // return await this.searchFacesByImage(params).promise();
    return await { SearchedFaceBoundingBox:
      { Width: 0.6795538067817688,
        Height: 0.5679137706756592,
        Left: 0.18765287101268768,
        Top: 0.22701628506183624 
      },
     SearchedFaceConfidence: 99.99989318847656,
     FaceMatches: [ { 
       Similarity: 99.99999237060547, 
       Face: {
        BoundingBox: {
         Height: 0.3234420120716095, 
         Left: 0.3233329951763153, 
         Top: 0.5, 
         Width: 0.24222199618816376
        }, 
        Confidence: 99.99829864501953, 
        FaceId: "38271d79-7bc2-5efb-b752-398a8d575b85", 
        ImageId: "d5631190-d039-54e4-b267-abd22c8647c5"
       },
      }
    ],
     FaceModelVersion: '4.0' 
    }
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
    logger.log({level: 'info', message: 'Rekognition - registerFace', additional: params });
    data = await this.indexFaces(params).promise();
    let face = {
      imageName: imageName,
      ExternalImageId: params.ExternalImageId,
    }
    return merge(data, face);
  }

  // List all of your available buckets in this AWS Region.
  async listMyBuckets() {
    const s3 = new AWS.S3();
    return await s3.listBuckets().promise();
  }
}

export default Rekognition;