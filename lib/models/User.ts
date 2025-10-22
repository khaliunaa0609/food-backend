import mongoose, { Schema } from "mongoose";

type UserSchemaType = {
  email: string;
  password: string;
  phonenumber: string;
  address: string;
  role: string;
  isVerified: boolean;
};

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: String },
    address: { type: String },
    role: { type: String, required: true, enum: ["USER", "ADMIN"] },
    isVerified: { type: Boolean },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<UserSchemaType>("User", UserSchema);
