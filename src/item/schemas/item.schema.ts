import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
});
