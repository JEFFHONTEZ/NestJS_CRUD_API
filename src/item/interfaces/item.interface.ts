import { Document } from 'mongoose';

export interface Item extends Document {
  id: number;
  name: string;
  description: string;
  color: string;
}
