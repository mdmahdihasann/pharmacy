import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!body.slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        slug: body.slug,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        status: body.status || "active",
        image: body.image || null,
        imagePublicId: body.imagePublicId || null,
      },
    });

    return NextResponse.json(category, { status: 201 });

  } catch (error: any) {
    console.error("CATEGORY CREATE ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        meta: error.meta,
      },
      { status: 500 }
    );
  }
}