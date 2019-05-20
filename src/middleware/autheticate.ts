import * as jwt from 'jsonwebtoken';
import { get } from 'lodash';

export const autheticate = async (resolve, root, args, context, info) => {
  try {

    const passwordToken = process.env.JWT_SECRET || '';
    const models = get(context, 'models');
    const token = checkToken(context);
    //let dataUser = await models.User.findOne({ token: token });

    //await jwt.verify(token, passwordToken);
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
