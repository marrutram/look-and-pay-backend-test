import { get, map } from 'lodash';
import User from '../../controllers/user.controller';
import Bucket from '../../controllers/bucket.controller';
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
    updateUser: async (_, args, { models }) => {
      const email = get(args, 'email');

      const user = new User();
      let dataUser = await models.User.findOne({ email: email });

      if (!dataUser) {
        dataUser = new models.User(args);
      } else {
        user.updateParametersUser(args, dataUser);
      }

      try {
        await dataUser.save();
      } catch (e) {
        throw new Error('Cannot Save Cart!!!');
      }

      return true;
    },

    signup: async (_, arg, { models }) => {
      arg.password = await bcrypt.hash(arg.password, 10);
      console.log("arg:", arg);
      const isRegistered = await models.User.findOne({ email: arg.email });
      
      if (!isRegistered) {
        const bucket = new Bucket();
        try {
          const imageName = camelCase(`${arg.name}${arg.lastnanme}`);
          const imageUploaded = await bucket.putImage(imageName, arg.urlImagen);

        } catch (err) {
          throw new Error(err.message); 
        }
        
        const user = await models.User.create(arg);
        return jsonwebtoken.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1y' });
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
