import { get, map } from 'lodash';
import Bucket from '../../controllers/bucket.controller';
import Rekognition from '../../controllers/rekognition.controller';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { camelCase } from 'lodash';
import { logger } from '../../logger';

export default {
  Query: {
    users: async (_, args, { models }) => {
      return await models.User.find({});
    },
    myInfo: async (_, args, { models, authUser }) => {
      return await models.User.findOne({_id: authUser.id});
    }
  },
  Mutation: {
    signup: async (_, arg, { models }) => {
      let data = null;
      const bucket = new Bucket();
      const rekognition = new Rekognition();
      arg.password = await bcrypt.hash(arg.password, 10);
      const isRegistered = await models.User.findOne({ email: arg.email });
      
      if (!isRegistered) {
        const imageName = camelCase(`${arg.name}${arg.lastname}${arg.email}`);
        const imageUploaded = await bucket.putImage(imageName, arg.urlImagen);
        const existRekognition = await rekognition.searchFace(imageUploaded.key, "register");
        if (!isRegistered) {
          throw new Error('There is another user with the same face'); 
        }
        try {
          data = await rekognition.registerFace(imageUploaded.key, imageUploaded.ETag);
          arg["urlImagen"] = `${process.env.AWS_URL_S3_BUCKET}/${imageUploaded.key}`;
          arg["faceIds"] = await data.FaceRecords.map((elem: object) => elem["Face"]["FaceId"]);

          const user = await models.User.create(arg);
          logger.log({level: 'info', message: 'Mutation - signup', 
            additional: { id: user.id, email: user.email } 
          });
          const token = jsonwebtoken.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1y' });
          
          return {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token: token
          };
        } catch (err) {
          throw new Error(err.message); 
        }
      }
      throw new Error('There is already a user with this email'); 
    },

    login: async (_, { email, password }, { models }) => {
      const user = await models.User.findOne({ email: email })

      if (!user) {
        throw new Error('No user with that email')
      }
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Incorrect password')
      }

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )

      return {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        token: token
      };
    }

  }
};
