import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const body = await req.json();

    const categoryCreate = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        thumbnail: body.thumbnail,
        status: body.status,
      },
    });
    return NextResponse.json(categoryCreate, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Category Create Faild" },
      { status: 500 },
    );
  }
}
