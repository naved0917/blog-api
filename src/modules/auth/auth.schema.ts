import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export interface TypeAuth {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  password: string;
  timestamp?: Date;
}

export interface Auth extends TypeAuth, mongoose.Document { }
export const AuthSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  userType: { type: String, required: true },
  password: { type: String, required: true },
  timestamp: { type: Date, required: true },
});
