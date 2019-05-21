import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  lastname: {
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
    required: true,
    unique: false
  },
  urlImagen: {
    type: String,
    required: true,
    unique: false
  },
  nameCard: {
    type: String,
    required: false,
    unique: false
  },
  numberCard: {
    type: String,
    required: false,
    unique: false
  },
  expDateCard: {
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