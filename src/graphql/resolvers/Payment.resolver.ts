import Bucket from '../../controllers/bucket.controller';
import Rekognition from '../../controllers/rekognition.controller';
import { get, map } from 'lodash';

export default {
  Query: {
    payments: async (_, args, { models }) => {
      const payments = await models.Payment.find({});
      return payments;
    }
  },
  Mutation: {
    createPayment: async (_, arg, { models }) => {
      const bucket = new Bucket();
      const rekognition = new Rekognition();
      const bitmap = arg["userImage"];
      const date = new Date();
      let isRegistered = null;
      const imageName = `${date.getTime()}-payment`;
      const imageUploaded = await bucket.putImage(imageName, bitmap, "payment");
      let data = await rekognition.searchFace(imageUploaded.key);
      delete arg["userImage"];
      let ids = data.FaceMatches.map( (element) => {
        return element.Face.FaceId;
      });
      isRegistered = await models.User.findOne({ faceIds: { $in: ids } });
      
      const pay = await models.Payment.create(arg);
      return true;
    }
  }
};

