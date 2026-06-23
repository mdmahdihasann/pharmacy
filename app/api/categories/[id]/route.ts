
import { prisma } from "@/lib/prisma";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const status = formData.get("status") as string;
    const imageFile = formData.get("image") as File | null;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 },
      );
    }

    let imageUrl: string | null = category.image;

    if (imageFile && imageFile.size > 0) {
      if (category?.image) {
        const oldFile = path.join(process.cwd(), "public", category?.image);
        if (fs.existsSync(oldFile)) {
          fs.unlinkSync(oldFile);
        }
      }

      const fileName = Date.now() + "-" + imageFile.name;
      const bytes = await imageFile.arrayBuffer();
      fs.writeFileSync(
        path.join(process.cwd(), "public/uploads/category", fileName),
        Buffer.from(bytes),
      );

      imageUrl = `/uploads/category/${fileName}`;
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        status,
        image: imageUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Category update failed",
        error: error.message,
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
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category Not Found",
        },
        { status: 404 },
      );
    }

    if (category?.image) {
      const imagePath = path.join(process.cwd(), "public", category.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await prisma.category.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Category deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
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
