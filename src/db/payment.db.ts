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
  total: {
    type: String,
    required: false,
    unique: false,
  },
  sku: {
    type: String,
    required: false,
    unique: true,
  }
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updatedAt'
  } 
});

const PaymentsSchema = new Schema({
  total: {
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


