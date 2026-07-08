import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.emailOTP.deleteMany({
      where: {
        email,
      },
    });

    await prisma.emailOTP.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: "Your OTP Code",
      html: `
  <div style="font-family:sans-serif">
    <h2>Email Verification</h2>
    <p>Your OTP is</p>
    <h1>${otp}</h1>
    <p>This OTP expires in 5 minutes.</p>
  </div>
  `,
    });

    console.log("Resend Response:", response);

    return NextResponse.json({
      success: true,
      message: "OTP Sent",
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
