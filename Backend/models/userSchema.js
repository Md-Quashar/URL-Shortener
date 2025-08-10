import mongoose from "mongoose";
import bcrypt  from 'bcryptjs'
import dotenv from 'dotenv';
dotenv.config('../.env');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
  },
});


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password,this.password);
};



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt= await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
 