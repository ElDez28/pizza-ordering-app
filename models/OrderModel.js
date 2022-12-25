import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: [true, "Order must have a customer"],
    },
    address: {
      type: String,
      required: [true, "Order must have an adress"],
    },
    total: {
      type: Number,
      required: [true, "Order must have total"],
    },
    status: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      required: [true, "You must enter your phone number"],
    },
    method: {
      type: Number,
      required: [true, "You must have payment method"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
