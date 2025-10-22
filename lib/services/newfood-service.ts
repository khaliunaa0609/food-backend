import { Category } from "../models/Category";
import { NewFood } from "../models/NewFood";
import connectDB from "../mongodb";
import { NewFoodType } from "../utils/types";

export const createNewFood = async (newFoodData: NewFoodType) => {
  await connectDB();
  const newNewFood = new NewFood({ ...newFoodData });
  await newNewFood.save();
  return newNewFood;
};

export const getAllNewFoods = async () => {
  await connectDB();
  Category;
  const allNewFoods: NewFoodType[] = await NewFood.find().populate(
    "categoryId"
  );
  return allNewFoods;
};

export const deleteNewFoodByFoodId = async (foodId: string) => {
  await connectDB();
  await NewFood.findByIdAndDelete(foodId);
  return await NewFood.find();
};

export const editNewFood = async (
  newFoodData: NewFoodType,
  foodId: string
): Promise<NewFoodType | string> => {
  await connectDB();
  const updatedFood = await NewFood.findByIdAndUpdate(
    foodId,
    {
      ...newFoodData,
    },
    { new: true }
  ).populate("categoryId");
  return updatedFood;
};
