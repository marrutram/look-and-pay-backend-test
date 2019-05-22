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
      const Users = await models.User.find({});
      return Users;
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
        try {
          const imageName = camelCase(`${arg.name}${arg.lastname}${arg.email}`);
          const imageUploaded = await bucket.putImage(imageName, arg.urlImagen);
          data = await rekognition.registerFace(get(imageUploaded, 'key'), imageUploaded.ETag);
          let faces = data.FaceRecords.map((elem: object) => elem["Face"]["FaceId"]);
          arg["urlImagen"] = get(imageUploaded, 'key');
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
