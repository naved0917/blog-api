import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export interface TypeBlog {
  userId?: string;
  postName: string;
  category: string;
  description: string;
  image: string;
  timestamp?: Date;
}

export interface Blog extends TypeBlog, mongoose.Document { }
export const BlogSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  postName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  timestamp: { type: Date, required: true },
});
