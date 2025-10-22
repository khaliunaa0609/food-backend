import { NextRequest, NextResponse } from "next/server";
import {
  createCategory,
  getAllCategories,
} from "@/lib/services/category-service";

export async function GET() {
  const categories = await getAllCategories();
  const response = NextResponse.json({ data: categories }, { status: 200 });

  return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  await createCategory(body.categoryName);

  return new NextResponse(JSON.stringify({ message: "Category created!" }), {
    status: 200,
  });
}
