import mongoose from 'mongoose';
import { Password } from '../services/password';

// Describes the properties that are required to create a new user (to get TS involved when creating a new User Document)
interface UserAttrs {
  email: string;
  password: string;
}

// Describes the properties of a User Document (to get TS aware of properties that a newly created User Document has)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// Describes the properties of a User Model (to get TS aware of custom 'build' method)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    // The function that this object contains transform JSON data returned from a document so it has only particular properties
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      }
    }
  }
);

// Pre-saving hook, gets invoked when attempt to save a user occurs
userSchema.pre('save', async function (done) {
  // Hash the password when saving to the DB only if it has been modified. If it was just email change query and password is the same as it was, this if statement won't be executed. Password also considered modified when initial saving to the DB.
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// Custom method for building a new User Document, so TS could check the properties that are passed in, as mongoose by default does not have this functionality
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
