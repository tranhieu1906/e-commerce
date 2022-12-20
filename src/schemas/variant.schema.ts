import { Schema } from "mongoose";
import mongoose from "../configs/database";

const variantSchema = new Schema({
  size: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL"],
    required: true,
  },
  color: {
    type: String,
    enum: ["black", "white", "red", "blue", "green", "yellow"],
    required: true,
  },
});

export const Variant = mongoose.model("variant", variantSchema);
