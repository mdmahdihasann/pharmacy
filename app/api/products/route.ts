import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/upload";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const sku = formData.get("sku") as string;
    const price = Number(formData.get("price"));
    const weight = formData.get("weight") as string;
    const description = formData.get("description") as string;
    const stock = Number(formData.get("stock"));
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("images") as File | null;

    let imagesUrl: string | null = null;
    let imagePublicId: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile, "products");

      if (uploadResult && typeof uploadResult === "object") {
        imagesUrl = uploadResult.secure_url || null;
        imagePublicId = uploadResult.public_id || null;
      }
    }

    const products = await prisma.product.create({
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
        message: "Product created successfully",
      },
      { status: 201 },
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
