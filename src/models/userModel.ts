import { HydratedDocument, Model, Schema, model } from 'mongoose';
import { generateHashedPassword } from '../utils/helperFunction';

interface IUser {
  username: string;
  password: string;
}

export type HydratedUserDocument = HydratedDocument<IUser>;

interface UserModel extends Model<IUser, {}, {}, {}, HydratedUserDocument> {
  build: (attr: IUser) => HydratedUserDocument;
}

const UserSchema = new Schema<IUser, UserModel>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.static('build', function (attr: IUser) {
  return new this(attr);
});

UserSchema.pre('save', async function (next) {
  const hashedPassword = await generateHashedPassword(this.password);
  this.password = hashedPassword;

  next();
});
const User = model<IUser, UserModel>('User', UserSchema);

export { User };
