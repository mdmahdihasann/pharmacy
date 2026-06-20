import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const sku = formData.get("sku") as string;
    const price = Number(formData.get("price"));
    const weight = formData.get("weight") as string;
    const description = formData.get("description") as string;
    const stock = Number(formData.get("stock"));
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("images") as File | null;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 },
      );
    }

    let imagesUrl: string | null = product.images;
    let imagePublicId: string | null = product.thumbnail;

    if (imageFile && imageFile.size > 0) {
      if (product.thumbnail) {
        await cloudinary.uploader.destroy(product.thumbnail);
      }

      const uploadResult = await uploadToCloudinary(imageFile, "products")
      imagesUrl = uploadResult.secure_url || null;
      imagePublicId = uploadResult.public_id || null;
    }

    const products = await prisma.product.update({
      where: {id},
      data: {
        name,
        sku,
        price,
        weight,
        description,
        stock,
        images: imagesUrl,
        thumbnail: imagePublicId,
        categoryId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: products,
        message: "Product Updated successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("CATEGORY CREATE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
        meta: error.meta,
      },
      { status: 500 },
    );
  }
}

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
        { status: 404 },
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
    console.log(error);
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
