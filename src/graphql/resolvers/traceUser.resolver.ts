import { get, map } from 'lodash';
import User from '../../controllers/user.controller';
import Bucket from '../../controllers/bucket.controller';
import Rekognition from '../../controllers/rekognition.controller';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { camelCase } from 'lodash';
require('dotenv').config();

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
          const imageName = camelCase(`${arg.name}${arg.lastnanme}${arg.email}`);
          const imageUploaded = await bucket.putImage(imageName, arg.urlImagen);
          data = await rekognition.registerFace(get(imageUploaded, 'key'), imageUploaded.ETag);
          arg["urlImagen"] = get(imageUploaded, 'key');

          const user = await models.User.create(arg);
          
          return jsonwebtoken.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1y' });
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

      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )
    }

  }
};
