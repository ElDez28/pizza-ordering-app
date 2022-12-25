import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product must have a title"],
    },
    desc: {
      type: String,
      required: [true, "Product must have a description"],
    },
    image: {
      type: String,
      required: [true, "Product must have an image"],
    },
    prices: { type: [Number], required: [true, "Product must have prices"] },
    extraOptions: [
      {
        text: { type: String },
        price: {
          type: Number,
          required: [true, "Extra option must have a price"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product =
  mongoose.models?.Product || mongoose.model("Product", ProductSchema);
export default Product;
