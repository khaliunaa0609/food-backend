import mongoose, { Schema } from "mongoose";

type FoodSchemaType = {
  name: string;
  price: number;
  ingredients: string;
  image: string;
};

const FoodSchema = new Schema({
  name: String,
  price: Number,
  ingredients: String,
  image: String,
});

export const Food =
  mongoose.models.Food || mongoose.model<FoodSchemaType>("Food", FoodSchema);
