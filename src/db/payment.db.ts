import { Schema, model } from 'mongoose';

const ProductsSchema = new Schema({
  description: {
    type: String,
    required: false,
    unique: false,
  },
  count: {
    type: String,
    required: false,
    unique: false,
  },
  balance: {
    type: String,
    required: false,
    unique: false,
  },
  image: {
    type: String,
  }
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updatedAt'
  } 
});

const PaymentsSchema = new Schema({
  balance: {
    type: String,
    required: false,
    unique: false,
  },
  products: {
    type: [ProductsSchema],
    required: false,
    unique: false,
  },
  user:  {
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

export default model('Payments', PaymentsSchema);


