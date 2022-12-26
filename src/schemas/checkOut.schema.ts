import { Schema } from "mongoose";
import mongoose from "../configs/database";
const checkoutProductSchema = new Schema({
  customer: {
    idUser: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },
  },
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  billingAddress: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()).toLocaleDateString(),
  },
});

export const CheckoutProduct = mongoose.model(
  "CheckoutProduct",
  checkoutProductSchema
);
