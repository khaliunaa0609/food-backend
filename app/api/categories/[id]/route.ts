import { deleteCategoryById } from "@/lib/services/category-service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categories = await deleteCategoryById(id);

  return NextResponse.json({ data: categories }, { status: 200 });
}
