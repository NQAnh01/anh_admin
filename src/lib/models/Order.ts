import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerClerkId: String,
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      color: String,
      quantity: Number,
    },
  ],
  phoneNumber: String,
  shippingAddress: String,
  shippingRate: String,
  total: Number,
  status: {
    type: String,
    enum: ["Đặt hàng", "Vận chuyển", "Đã nhận"],
    default: "Đặt hàng",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
