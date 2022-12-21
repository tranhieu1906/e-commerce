import { Schema } from "mongoose";
import mongoose from "../configs/database";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  whiteList: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()).toLocaleDateString(),
  },
});

export const Product = mongoose.model("product", productSchema);
