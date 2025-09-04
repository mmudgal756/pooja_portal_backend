
import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Products', 'Anusthans'] // Enforce the two allowed values
  },
  description: { type: String }
});

export const Category = model('Category', categorySchema);
