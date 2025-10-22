import { NextRequest, NextResponse } from "next/server";
import {
  createNewFood,
  editNewFood,
  getAllNewFoods,
} from "@/lib/services/newfood-service";
import { NewFoodType } from "@/lib/utils/types";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

export async function GET() {
  const newFoods = await getAllNewFoods();
  const response = NextResponse.json({ data: newFoods }, { status: 200 });
  console.log("ALLNEWFOODS =====", newFoods, "===== ALLNEWFOODS");

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const formNewData = await request.formData();

    const foodName = formNewData.get("foodName") as string;
    const price = formNewData.get("price") as string;
    const ingredients = formNewData.get("ingredients") as string;
    const categoryId = formNewData.get("categoryId") as string;
    const image = formNewData.get("image") as File;

    if (!foodName || !price || !ingredients || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const newFoodData: NewFoodType = {
      foodName,
      price: parseFloat(price),
      ingredients,
      categoryId,
      image: imageUrl,
    };

    await createNewFood(newFoodData);

    return NextResponse.json(
      {
        success: true,
        message: "New Food item received and image uploaded successfully",
        data: newFoodData,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process new food data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formEditedData = await request.formData();

    const foodName = formEditedData.get("editedFoodName") as string;
    const categoryId = formEditedData.get("editedCategorySelected") as string;
    const ingredients = formEditedData.get("editedIngredients") as string;
    const price = formEditedData.get("editedPrice") as string;
    const image = formEditedData.get("editedImage") as File | string;
    const foodId = formEditedData.get("selectedFoodId") as string;

    if (!foodName || !categoryId || !ingredients || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    } else if (!foodId) {
      return NextResponse.json({ error: "FoodId is missing" });
    }

    let imageUrl = "";
    if (image instanceof File) {
      imageUrl = await uploadImageToCloudinary(image);
    } else if (typeof image === "string") {
      imageUrl = image;
    }

    const newFoodData: NewFoodType = {
      foodName,
      categoryId,
      ingredients,
      price: parseFloat(price),
      image: imageUrl,
    };

    await editNewFood(newFoodData, foodId);

    return NextResponse.json(
      {
        succes: true,
        message: "New Food item received and image uploaded successfully",
        data: newFoodData,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process edited new food data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
