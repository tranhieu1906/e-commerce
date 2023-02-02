import { Schema } from "mongoose";
import mongoose from "../configs/database";

const wishListSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
      addedAt: {
        type: Date,
        default: new Date(Date.now()).toLocaleDateString(),
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export const wishList = mongoose.model("wishList", wishListSchema);
