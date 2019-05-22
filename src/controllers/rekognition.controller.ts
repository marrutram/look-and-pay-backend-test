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
      FaceMatchThreshold: 97,
      MaxFaces: 3,
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET_PAYMENT,
          Name: imageUrl
        }
      }
    };
    logger.log({level: 'info', message: 'Rekognition - searchFace', additional: params });
    // return await this.searchFacesByImage(params).promise();
    
    return await {  
      "SearchedFaceBoundingBox":{  
         "Width":0.19209858775138855,
         "Height":0.15299253165721893,
         "Left":0.34854984283447266,
         "Top":0.25260359048843384
      },
      "SearchedFaceConfidence":99.99991607666016,
      "FaceMatches":[  
         {  
            "Similarity":99.66668701171875,
            "Face":{  
               "FaceId":"95c4d095-8f50-428e-b412-c639adf7dbcb",
               "BoundingBox":{  
                  "Width":0.6795539855957031,
                  "Height":0.5679140090942383,
                  "Left":0.18765300512313843,
                  "Top":0.22701600193977356
               },
               "ImageId":"30a7b7ab-75e4-3d4d-97fb-14c2c1f0feab",
               "ExternalImageId":"8f905c0a9397c81249bd6079e96f64f7",
               "Confidence":99.9999008178711
            }
         }
      ],
      "FaceModelVersion":"4.0"
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