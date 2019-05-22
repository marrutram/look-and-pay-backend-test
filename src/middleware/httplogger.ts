import { logger } from '../logger';
import { get, indexOf } from 'lodash';

export const httplogger = async (resolve, root, args, context, info) => {
  logger.log({level: 'info', message: 'HTTP - '});
};
