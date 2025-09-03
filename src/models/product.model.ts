
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  stock: { type: Number, required: true, default: 0 },
  vendor: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Product = model('Product', productSchema);
