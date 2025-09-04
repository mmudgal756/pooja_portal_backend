import { Schema, model, Document } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Anusthan:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the anusthan
 *         name:
 *           type: string
 *           description: The name of the anusthan
 *         description:
 *           type: string
 *           description: The description of the anusthan
 *         price:
 *           type: number
 *           description: The price of the anusthan
 *       example:
 *         id: d5fE_asz
 *         name: Rudrabhishek
 *         description: A powerful vedic ritual
 *         price: 5100
 */

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
