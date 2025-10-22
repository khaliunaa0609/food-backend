import mongoose, { Schema } from "mongoose";

type NewFoodSchemaType = {
  foodName: string;
  price: number;
  categoryId: string;
  ingredients: string;
  image: string;
};

const NewFoodSchema = new Schema(
  {
    foodName: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: {
      type: Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    ingredients: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const NewFood =
  mongoose.models.NewFood ||
  mongoose.model<NewFoodSchemaType>("NewFood", NewFoodSchema);
