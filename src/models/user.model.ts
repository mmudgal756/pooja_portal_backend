
import { Schema, model, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Vendor" | "Customer";
  wishlist: ObjectId[];
  addresses: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }[];
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Vendor', 'Customer'], default: 'Customer' },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  addresses: [{
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  }]
}, { timestamps: true });

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>('User', userSchema);
