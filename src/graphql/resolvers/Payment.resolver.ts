import Bucket from '../../controllers/bucket.controller';
import Rekognition from '../../controllers/rekognition.controller';
import { get, map } from 'lodash';

export default {
  Query: {
    payments: async (_, args, { models, authUser }) => {
      return await models.Payment.find({user: authUser.id});
    }
  },
  Mutation: {
    createPayment: async (_, arg, { models }) => {
      const bucket = new Bucket();
      const rekognition = new Rekognition();
      const bitmap = arg["userImage"];
      const date = new Date();
      const imageName = `${date.getTime()}-payment`;
      const imageUploaded = await bucket.putImage(imageName, bitmap, "payment");
      let data = await rekognition.searchFace(imageUploaded.key);
      let ids = data.FaceMatches.map( (element) => {
        return element.Face.FaceId;
      });
      let user = await models.User.findOne({ faceIds: { $in: ids } });
      
      if (!user){
        throw new Error("The User Doesn't exist"); 
      }
      delete arg["userImage"];
      arg.user = user.id;
      const pay = await models.Payment.create(arg);
      return true;
    }
  }
};

