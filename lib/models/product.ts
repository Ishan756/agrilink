import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: String,
    description: String,
    price: {
      current: Number,
      base: Number,
    },
    image: String,
    category: String,
    farmer: {
      name: String,
      rating: Number,
    },
    stock: {
      quantity: Number,
      unit: String,
    },
    specifications: {
      organic: Boolean,
      grade: String,
    },
    location: {
      region: String,
    },
    averageRating: Number,
    farmType: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);