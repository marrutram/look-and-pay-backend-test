import { Schema, model } from 'mongoose';

const ImagesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  }
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updatedAt'
  } 
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  images: {
    type: [ImagesSchema],
    default: undefined,
    required: false
  }
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updatedAt'
  } 
});

export default model('User', UserSchema);