import { deleteNewFoodByFoodId } from "@/lib/services/newfood-service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ foodId: string }> }
) {
  const { foodId } = await params;
  const newfoods = await deleteNewFoodByFoodId(foodId);

  return NextResponse.json({ data: newfoods }, { status: 200 });
}
