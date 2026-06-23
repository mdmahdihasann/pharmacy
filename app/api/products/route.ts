import { prisma } from "@/lib/prisma";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

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

    let imagesUrl: string | null = "";

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = Date.now() + "-" + imageFile.name;
      const uploadDir = path.join(process.cwd(), "/public/uploads/product");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, fileName), buffer);
      imagesUrl = `/uploads/product/${fileName}`;
    }

    const products = await prisma.product.create({
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
