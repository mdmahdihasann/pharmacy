
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body,
        status: body.status,
        image: body.image,
        imagePublicId: '22',
      },
    });

    return NextResponse.json(category, { status: 201 });

  } catch (error: any) {
    console.log("🔥 ERROR DETAILS:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });

    return NextResponse.json(
      { 
        error: error.message || "Server Error",
        details: error.meta
      },
      { status: 500 }
    );
  }
}