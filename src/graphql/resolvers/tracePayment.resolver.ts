import { get, map } from 'lodash';

export default {
  Query: {
    payments: async (_, args, { models }) => {
      const Payments = await models.Payments.find({});
      return Payments;
    }
  },
  Mutation: {}
};

