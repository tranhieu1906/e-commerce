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
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  variant: {
    type: Schema.Types.ObjectId,
    ref: "variants",
  },
});

export const Product = mongoose.model("product", productSchema);
