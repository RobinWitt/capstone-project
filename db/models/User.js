import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, required: true },
  favorites: [Number],
  lastPlayed: Object,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
