import { deleteFoodById, updateFoodById } from "@/lib/services/food-service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const foods = await deleteFoodById(id);

  return NextResponse.json({ data: foods }, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const foods = await updateFoodById(id);

  return NextResponse.json({ data: foods }, { status: 200 });
}
