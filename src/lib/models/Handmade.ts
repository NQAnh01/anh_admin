import mongoose from "mongoose";

const handmadeSchema = new mongoose.Schema({
  customerClerkId: String,
  title: String,
  description: String,
  image: String,
  phoneNumber: String,
  shippingAddress: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Handmade =
  mongoose.models.Handmade || mongoose.model("Handmade", handmadeSchema);

export default Handmade;
