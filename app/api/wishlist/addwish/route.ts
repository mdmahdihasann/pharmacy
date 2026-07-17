import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, productId } = await req.json();

    await prisma.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    return NextResponse.json({
      succes: true,
      message: "Wishlist add successfully",
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      succes: false,
      message: "Wishlist faild",
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId, productId } = await req.json();

    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    return NextResponse.json({
      succes: true,
      message: "Wishlist Delete successfully",
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      succes: false,
      message: "Wishlist delete faild",
    });
  }
}
