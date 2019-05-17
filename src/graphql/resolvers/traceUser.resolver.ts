import { get, map } from 'lodash';
import User from '../../controllers/user.controller';
export default {
  Query: {
    users: async (_, args, { models }) => {
      const Users = await models.User.find({});
      return Users;
    }
  },
  Mutation: {
    updateUser: async (_, args, { models }) =>  {
      const email = get(args, 'email');

      const user = new User();
      let dataUser = await models.User.findOne({ email: email });

      if(!dataUser) {
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
    }
  }
};
