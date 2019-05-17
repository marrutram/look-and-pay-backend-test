import mongoose = require("mongoose");
import User from './user.db';

global.Promise = require("q").Promise;
mongoose.Promise = global.Promise;

export const startDB = ({ user, pwd, url, host, db }) => {
  mongoose.connect(`${host}://${user}:${pwd}@${url}/${db}`, {useNewUrlParser: true})
  .then(() => console.log("Connected BD"))
  .catch(err => console.error(err));
}

export const models = {
  User
}