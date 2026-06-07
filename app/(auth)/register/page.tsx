"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

//   const sendOtp = async () => {
//     localStorage.setItem("email", email);
//     localStorage.setItem("name", name);

//     await supabase.auth.signInWithOtp({
//       email,
//       options: {
//         shouldCreateUser: true,
//       },
//     });

//     router.push("/verify-otp");
//   };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create Account
      </h1>

      <input
        placeholder="Full Name"
        className="border p-3 w-full mb-4 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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