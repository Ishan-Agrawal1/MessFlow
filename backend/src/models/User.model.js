import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { USER_ROLES } from '../constants/index.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    studentId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.STUDENT,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    batch: {
      type: Number,
      validate: {
        validator: function (v) {
          return v === null || v === undefined || /^\d{4}$/.test(String(v));
        },
        message: 'Batch must be a 4-digit number',
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save hook: hash password if modified.
 * Mongoose 9 uses async/await — no `next` callback.
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Compare a candidate password with the stored hashed password.
 * @param {string} candidatePassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Remove password from JSON output.
 */
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

export default User;
