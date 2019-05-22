import * as jwt from 'jsonwebtoken';
import { get, words } from 'lodash';

export const autheticate = async (resolve, root, args, context, info) => {
  const exclude = ['login', 'signup', 'createPayment'];
  const isExclude = !exclude.find((element) =>{return element === info.fieldName});

  try {
    if(!root && isExclude) {
      const passwordToken = process.env.JWT_SECRET || '';
      const token = checkToken(context);
      await jwt.verify(token, passwordToken);
    }
    
  } catch (e) {
    console.log("err the autheticate::", e);
    throw new Error('Not authorise.');
  }
  const result = await resolve(root, args, context, info);
  return result;
};

const checkToken = (context) => {
  let token = null;
  const header = context.request.get("Authorization");
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        token = bearer[1];
    }
  return token;
}
