import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  favorites: [Number],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;