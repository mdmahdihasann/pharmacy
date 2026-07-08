"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [step, setStep] = useState<"send" | "verify">("send");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  // Send OTP
  const sendOtp = async () => {
    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");

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
    if (!otp.trim()) return toast.error("OTP is required");

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", {
        name,
        email,
        otp,
      });

      toast.success("Login Success");

      // যদি JWT/user return করেন
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 rounded-xl border p-8 shadow">

      <h2 className="text-3xl font-bold mb-6 text-center">
        {step === "send" ? "Create Account" : "Verify OTP"}
      </h2>

      {/* Step 1 */}
      {step === "send" && (
        <>
          <input
            className="border rounded p-3 w-full mb-4"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border rounded p-3 w-full mb-6"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full bg-[#2dc67b] text-white rounded p-3"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </>
      )}

      {/* Step 2 */}
      {step === "verify" && (
        <>
          <p className="text-sm text-gray-500 mb-4">
            OTP has been sent to <b>{email}</b>
          </p>

          <input
            className="border rounded p-3 w-full mb-4 text-center tracking-[8px] text-xl"
            placeholder="000000"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full bg-[#2dc67b] text-white rounded p-3"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={sendOtp}
            className="w-full mt-3 text-[#2dc67b] font-medium"
          >
            Resend OTP
          </button>

          <button
            onClick={() => setStep("send")}
            className="w-full mt-2 text-gray-500"
          >
            Change Email
          </button>
        </>
      )}
    </div>
  );
}