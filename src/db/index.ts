import mongoose = require("mongoose");
import User from './user.db';

global.Promise = require("q").Promise;
mongoose.Promise = global.Promise;

export const startDB = ({ user, pwd, url, host, db }) => {
  const validEnv = ["production", "test"];
  
  let stringConnection = validEnv.indexOf(process.env.ENVIRONMENT) ? (
    `${host}://${user}:${pwd}@${url}/${db}`
    ) : (
      `${host}://${url}/${db}`
    )

  mongoose.connect(stringConnection, {useNewUrlParser: true, useCreateIndex: true})
  .then(() => console.log("Connected BD"))
  .catch(err => console.error(err));
}

export const models = {
  User
}

