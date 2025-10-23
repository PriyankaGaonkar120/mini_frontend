import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  invoiceUrl: String
});

export default mongoose.model("Invoice", invoiceSchema);
