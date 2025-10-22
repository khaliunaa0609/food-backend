export type FoodType = {
  foodId?: number;
  foodName: string;
  price: number;
  ingredients: string;
  category?: string;
  image?: string;
  createdAt?: Date;
  updated?: Date;
};

export type NewFoodType = {
  _id?: string;
  foodName: string;
  price: number;
  ingredients: string;
  categoryId: string;
  image: string;
};

// export type CategoryType = {
//   _id?: string;
//   categoryName: string;
//   foods: NewFoodType[];
// };

export type CategoryType = {
  _id?: string;
  categoryName: string;
};
