import mongoose, { Schema } from 'mongoose';

import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    JSON: {
      virtuals: true,
    },
  }
);

UserSchema.method('toJSON', function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  obj.id = obj._id;
  return obj;
});

UserSchema.pre('save', function encrypt(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  callback
) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
