import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successfully",
    });
    response.cookies.delete("token");
    response.cookies.delete("role");
    return response;

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 },
    );
  }
}
