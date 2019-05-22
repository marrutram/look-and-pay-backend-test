import { get, map } from 'lodash';

export default {
  Query: {
    payments: async (_, args, { models }) => {
      const Payments = await models.Payments.find({});
      return Payments;
    }
  },
  Mutation: {
    createPayment: async (_, arg, { models }) => {
      console.log(arg);
      return true;
    }
  }
};

