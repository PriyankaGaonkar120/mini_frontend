import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  month: String,
  dueDate: Date,
  status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
});

export default mongoose.model("Payment", paymentSchema);
