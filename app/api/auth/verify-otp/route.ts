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
        }
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
        }
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
        role: "USER"
      },

    });



    return NextResponse.json({

      success: true,

      message: "Login Success",

      user,

    });



  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );

  }
}