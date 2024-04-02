import crypto from "crypto";
// import bycrypt from "bcryptjs";
import bcryptjs from "bcryptjs";
import { model, models, Schema } from "mongoose";
import validator from "validator";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  profilePicUrl: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "A user must have a first name"],
    },
    lastName: {
      type: String,
      required: [true, "A user must have a last name"],
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      unique: true,
      validate: [validator.isEmail, "Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
    },
    profilePicUrl: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

const User = models.User || model("User", userSchema);
export default User;
