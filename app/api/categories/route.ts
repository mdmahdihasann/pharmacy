// app/api/categories/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/upload";
import path from "path";
import fs from "fs";


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

    let imageUrl: string | null = "";

    if(imageFile){
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${imageFile.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads/category");
      if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir, {recursive: true});
      }
      fs.writeFileSync(
        path.join(uploadDir, fileName), buffer
      )
      imageUrl = `/uploads/category/${fileName}`;

    }
    

    const category = await prisma.category.create({
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

