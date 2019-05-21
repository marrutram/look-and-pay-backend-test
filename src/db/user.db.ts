import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  rut: {
    type: String,
    required: false,
    unique: false
  },
  password: {
    type: String,
    required: false,
    unique: false
  },
  urlImagen: {
    type: String,
    required: false,
    unique: false
  },
  s3ImageName: {
    type: String,
    required: false,
    unique: false
  }
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updatedAt'
  } 
});

export default model('User', UserSchema);