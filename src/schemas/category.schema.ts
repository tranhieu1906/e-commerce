import { Schema } from "mongoose";
import mongoose from "../configs/database";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
export const Category = mongoose.model("category", categorySchema);
