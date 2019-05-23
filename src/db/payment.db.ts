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
  },
  unit: {
    type: String,
    required: false,
    unique: false,
  },
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updatedAt'
  } 
});

const PaymentsSchema = new Schema({
  supermarket: String,
  electronicBill: String,
  date: String,
  hour: String, 
  balance: String,
  user: String,
  products: {
    type: [ProductsSchema]
  },
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updatedAt'
  } 
});

export default model('Payment', PaymentsSchema);