import { Document, Schema } from 'mongoose';

export const TodoSchema = new Schema({
  content: String,
  state: String,
});

export interface Todo extends Document {
  content: string;
  state: 'initial' | 'completed' | 'removed';
}
