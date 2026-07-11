import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { userId, productId } = await req.json();
  try {
    const cart = await prisma.cart.update({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
    return NextResponse.json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "No Increments",
    });
  }
}
