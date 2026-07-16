"use client";

import { useRef, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();

  const [step, setStep] = useState<"send" | "verify">("send");

  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // OTP box change
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const otpArray = otp.split("");

    otpArray[index] = value;

    const newOtp = otpArray.join("");

    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // OTP backspace
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Send OTP
  const sendOtp = async () => {
    if (!fullName.trim()) {
      return toast.error("Name is required");
    }

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);

      await api.post("/auth/send-otp", {
        email,
      });

      toast.success("OTP Sent Successfully");

      setStep("verify");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp.trim()) {
      return toast.error("OTP is required");
    }

    if (otp.length !== 6) {
      return toast.error("Enter 6 digit OTP");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        fullName,
        email,
        otp,
      });

      toast.success("Login Success");

      localStorage.setItem("user", JSON.stringify(res.data.user));

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
      <Card className="max-w-sm mx-auto mt-16 mb-20 shadow-xl border border-gray-400 rounded-2xl ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            {step === "send" ? "Login" : "Verify OTP"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {step === "send" && (
            <>
              <div className="space-y-2">
                <Label className="font-semibold text-gray-700">Full Name</Label>

                <Input
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-semibold text-gray-700">Email</Label>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400"
                />
              </div>

              <Button
                className="w-full bg-[#2dc67b] hover:bg-[#25b16b] text-white h-9"
                onClick={sendOtp}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}
          {step === "verify" && (
            <>
              <p className="text-start text-sm text-muted-foreground">
                OTP sent to
                <br />
                <span className="font-semibold text-black">{email}</span>
              </p>

              <div className="flex justify-between gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    value={otp[index] || ""}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    maxLength={1}
                    inputMode="numeric"
                    className="w-10 h-9 text-center text-xl font-bold border border-gray-500"
                  />
                ))}
              </div>

              <Button
                className="w-full bg-[#2dc67b] hover:bg-[#25b16b]  text-white h-9"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              <Button variant="outline" className="w-full mb-2 text-gray-800 h-9 border-gray-400 hover:bg-(--primary-color)" onClick={sendOtp}>
                Resend OTP
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setStep("send");
                  setOtp("");
                }}
              >
                Change Email
              </Button>
            </>
          )}
        </CardContent>
      </Card>
  );
}
