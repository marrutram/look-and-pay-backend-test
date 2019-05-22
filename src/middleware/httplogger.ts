import { logger } from '../logger';
import { omit } from 'lodash';

export const httplogger = async (resolve, root, args, context, info) => {
  let log = omit(args, ['userImage', 'urlImagen']);

  logger.log({
    level: 'info', 
    message: `HTTP - operation: ${info.operation.operation}: ${info.fieldName}`, 
    additional: log });
  return await resolve(root, args, context, info);
};
