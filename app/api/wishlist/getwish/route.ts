import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      {
        succes: true,
        message: "User ID is required",
      },
      { status: 404 },
    );
  }
  try {
    const items = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json({
      succes: true,
      data: items,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      succes: false,
      message: "Data Not found",
    });
  }
}
