import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  type: { type: String, enum: ["Feedback", "Complaint", "Suggestion"], default: "Feedback" }
});

export default mongoose.model("Feedback", feedbackSchema);
