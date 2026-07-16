import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, email, otp } = await req.json();

    const otpData = await prisma.emailOTP.findFirst({
      where: {
        email,
        otp,
        verified: false,
      },
    });

    if (!otpData) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        {
          status: 400,
        },
      );
    }

    if (otpData.expiresAt < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP Expired",
        },
        {
          status: 400,
        },
      );
    }

    // OTP verified update
    await prisma.emailOTP.update({
      where: {
        id: otpData.id,
      },
      data: {
        verified: true,
      },
    });

    // Create User
    const user = await prisma.user.upsert({
      where: {
        email,
      },

      update: {},

      create: {
        fullName,
        email,
        role: "USER",
      },
    });

    const response = NextResponse.json({
      success: true,

      message: "Login Success",

      user,
    });

    // Set Cookies
    response.cookies.set("token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set("role", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
