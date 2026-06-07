"use client";

import { useState } from "react";
// import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

//   const sendOtp = async () => {
//     localStorage.setItem("email", email);

//     await supabase.auth.signInWithOtp({
//       email,
//       options: {
//         shouldCreateUser: false,
//       },
//     });

//     router.push("/verify-otp");
//   };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <input
        placeholder="Email"
        className="border p-3 w-full mb-4 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        // onClick={sendOtp}
        className="w-full bg-black text-white p-3 rounded"
      >
        Send OTP
      </button>
    </div>
  );
}