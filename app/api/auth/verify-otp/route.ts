import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, otp } = await req.json();

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
      { status: 400 }
    );
  }

  if (otpData.expiresAt < new Date()) {
    return NextResponse.json(
      {
        success: false,
        message: "OTP Expired",
      },
      { status: 400 }
    );
  }

  await prisma.emailOTP.update({
    where: {
      id: otpData.id,
    },
    data: {
      verified: true,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Login Success",
  });
}