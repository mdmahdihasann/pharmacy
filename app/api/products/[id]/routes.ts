import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product Not found",
        },
        { status: 500 },
      );
    }

    if (product?.thumbnail) {
      await cloudinary.uploader.destroy(product.thumbnail);
    }
    await prisma.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
