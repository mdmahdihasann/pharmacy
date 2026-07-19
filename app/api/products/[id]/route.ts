"use server"

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
    const sku = formData.get("sku") as string;

    const genericName = formData.get("genericName") as string;
    const packSize = formData.get("packSize") as string;

    const price = Number(formData.get("price"));
    const salePrice = Number(formData.get("salePrice") || 0);

    const stock = Number(formData.get("stock"));

    const dosageForm = formData.get("dosageForm") as string;
    const strength = formData.get("strength") as string;

    const description = formData.get("description") as string;
    const manufacturer = formData.get("manufacturer") as string;

    const categoryId = formData.get("categoryId") as string;

    const prescriptionReq = formData.get("prescriptionReq") === "true";

    const status = formData.get("status") !== "false";

    const expiryDateValue = formData.get("expiryDate") as string;

    const expiryDate = expiryDateValue ? new Date(expiryDateValue) : null;
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

    if (imageFile && imageFile.size > 0) {
      if (product?.images) {
        const oldFile = path.join(process.cwd(), "public", product?.images);
        if (fs.existsSync(oldFile)) {
          fs.unlinkSync(oldFile);
        }
      }

      const fileName = Date.now() + "-" + imageFile.name;
      const bytes = await imageFile.arrayBuffer();
      fs.writeFileSync(
        path.join(process.cwd(), "public/uploads/product", fileName),
        Buffer.from(bytes),
      );

      imagesUrl = `/uploads/product/${fileName}`;
    }

    const products = await prisma.product.update({
      where: { id },
      data: {
        sku,
        name,

        genericName,
        packSize,

        price,
        salePrice,

        stock,

        dosageForm,
        strength,

        description,

        manufacturer,

        expiryDate,

        prescriptionReq,
        status,

        images: imagesUrl,

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

    if (product?.images) {
      const imagePath = path.join(process.cwd(), "public", product.images);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
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
