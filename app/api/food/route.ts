import { createFood, getAllFoods } from "@/lib/services/food-service";
import { FoodType } from "@/lib/utils/types";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const foods = await getAllFoods();
  const response = NextResponse.json({ data: foods }, { status: 200 });

  return response;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const foodName = formData.get("foodName") as string;
    const price = formData.get("price") as string;
    const ingredients = formData.get("ingredients") as string;
    const image = formData.get("image") as File;

    if (!foodName || !price || !ingredients) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const foodData: FoodType = {
      foodName,
      price: parseFloat(price),
      ingredients,
      image: imageUrl,
    };

    await createFood(foodData);

    return NextResponse.json(
      {
        success: true,
        message: "Food item received and image uploaded successfully",
        data: foodData,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process food data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
