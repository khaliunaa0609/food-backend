import { FoodType } from "../utils/types";
import connectDB from "../mongodb";
import { Food } from "../models/Food";

export const createFood = async (foodData: FoodType) => {
  await connectDB();
  const newFood = new Food({ ...foodData });
  await newFood.save();
  return newFood;
};

export const getAllFoods = async (): Promise<FoodType[]> => {
  await connectDB();
  const allFoods: FoodType[] = await Food.find();
  return allFoods;
};

export const deleteFoodById = async (id: string) => {
  await connectDB();
  await Food.findByIdAndDelete(id);
  return await Food.find();
};

export const updateFoodById = async (id: string) => {
  await connectDB();
  await Food.findOneAndUpdate({ id });
  return await Food.find();
};
