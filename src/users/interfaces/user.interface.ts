import { Document } from 'mongoose';

export interface User extends Document {
  // Remove _id: string; it is already inherited from Document
  email: string;
  password: string;
  role: string;
}
