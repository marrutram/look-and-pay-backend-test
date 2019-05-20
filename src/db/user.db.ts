import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  rut: {
    type: String,
    required: false,
    unique: false,
  },
  password: {
    type: String,
    required: false,
  },
  urlImagen: {
    type: String,
    required: false,
    unique: false,
  }
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updatedAt'
  } 
});

export default model('User', UserSchema);