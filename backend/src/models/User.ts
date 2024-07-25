import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  passwordUpdatedAt: {
    type: Date,
    default: Date.now()
  },
  usernameUpdatedAt: {
    type: Date,
    default: Date.now()
  },
  emailUpdatedAt: {
    type: Date,
  }
})
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.passwordUpdatedAt = new Date 
  }
  if (this.isModified('username')) {
    this.usernameUpdatedAt = new Date
  }
  if(this.isModified('username')){
    this.emailUpdatedAt = new Date
  }
  next();
});

const UserModel = model("UserModel", userSchema)

export default UserModel