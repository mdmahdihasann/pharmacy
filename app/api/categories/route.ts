// app/api/categories/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/upload";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const status = (formData.get("status") as string) || "active";
    const imageFile = formData.get("image") as File | null;

    let imageUrl: string | null = null;
    let imagePublicId: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile, "categories");

      if (uploadResult && typeof uploadResult === "object") {
        imageUrl = uploadResult.secure_url || null;
        imagePublicId = uploadResult.public_id || null;
      }
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        status,
        image: imageUrl,
        imagePublicId: imagePublicId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: category,
        message: "Category created successfully",
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
