import { Schema } from "mongoose";
import mongoose from "../configs/database";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});
export const Category = mongoose.model("category", categorySchema);
