import { Schema, model, Document } from 'mongoose';

export interface IAnusthan extends Document {
  name: string;
  description: string;
  price: number;
}

const AnusthanSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default model<IAnusthan>('Anusthan', AnusthanSchema);
