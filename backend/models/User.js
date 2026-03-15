import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student'
    },
    avatarUrl: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

