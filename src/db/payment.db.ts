import { Schema, model } from 'mongoose';

const ProductsSchema = new Schema({
  description: String,
  count: String,
  balance: String,
  image: String
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