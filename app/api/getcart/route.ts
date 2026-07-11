import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const  {userId} = await req.json()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }
    
    const items = await prisma.cart.findMany({
      where: {
        userId,
      },
      include:{
        product: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: items,
      }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Cart not found",
      },
      { status: 500 },
    );
  }
}
