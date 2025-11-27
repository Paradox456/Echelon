import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },  // Make optional for Google OAuth
  picture: String,  // Google profile picture
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);