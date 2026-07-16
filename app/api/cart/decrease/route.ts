import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const { userId, productId } = await req.json();
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart item not found",
        },
        { status: 404 },
      );
    }

    if (cart.quantity <= 1) {
      await prisma.cart.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });
      return NextResponse.json(
        {
          success: true,
          deleted: true,
          message: "Cart item deleted successfully",
        }
      );
    }

    const updateCart = await prisma.cart.update({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    return NextResponse.json({
      success: true,
      deleted: false,
      data: updateCart,
      message: "Data decrement successfully",
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Data decrement successfully",
    });
  }
}
