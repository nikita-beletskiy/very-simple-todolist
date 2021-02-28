import mongoose from 'mongoose';

interface TodoAttrs {
  title: string;
  userId: string;
}

export interface TodoDoc extends mongoose.Document {
  title: string;
  userId: string;
  done: boolean;
}

interface TodoModel extends mongoose.Model<TodoDoc> {
  build(attrs: TodoAttrs): TodoDoc;
}

const todoSchema = new mongoose.Schema<TodoDoc, TodoModel>(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true },
    done: { type: Boolean, default: false }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

todoSchema.statics.build = (attrs: TodoAttrs) => new Todo(attrs);

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema, 'todos');

export { Todo };
