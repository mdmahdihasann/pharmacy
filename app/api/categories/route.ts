import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const status = formData.get("status") as string;

    console.log("Received data:", { name, slug, status }); // Debug log

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Image missing" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "category" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        status, // Make sure this matches your Prisma schema
        image: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
      },
    });

    return NextResponse.json(category, { status: 201 });

  } catch (error: any) {
    // Log the full error details
    console.log("🔥 ERROR DETAILS:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });

    return NextResponse.json(
      { 
        error: error.message || "Server Error",
        details: error.meta // Include Prisma error details in development
      },
      { status: 500 }
    );
  }
}