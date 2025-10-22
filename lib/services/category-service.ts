import connectDB from "../mongodb";
import { Category } from "../models/Category";
import { CategoryType } from "../utils/types";

export const createCategory = async (categoryName: string) => {
  await connectDB();
  const newCategory = new Category({ categoryName });
  await newCategory.save();
  return newCategory;
};

export const getAllCategories = async () => {
  await connectDB();
  const allCategories: CategoryType[] = await Category.find().select({
    __v: 0,
  });
  return allCategories;
};

export const deleteCategoryById = async (id: string) => {
  await connectDB();
  await Category.findByIdAndDelete(id);
  return await Category.find();
};

// export const getAllCategories = async () => {
//   await connectDB();
//   const allCategories = await Category.find().select({ __v: 0 }).lean();

//   const finalCategories = [];

//   for (let i = 0; i < allCategories.length; i++) {
//     const { _id } = allCategories[i];

//     const foods: NewFoodType[] = await NewFood.find({ categoryId: _id });

//     if (foods.length > 0) {
//       finalCategories.push({ ...allCategories[i], foods });
//     }
//   }

//   return finalCategories;
// };
