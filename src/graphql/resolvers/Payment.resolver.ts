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
      delete arg["userImage"];
      const pay = await models.Payment.create(arg);
      return true;
    }
  }
};

