"use client";

import Cookies from "js-cookie";
import { useState } from "react";
// import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const data = {
  email: "admin@gmail.com",
  password: "admin123",
  role: "admin",
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if(email === data.email && password === data.password) {
      Cookies.set("token", "admin-token-123", {
        expires: 7,
      });
      Cookies.set("role", data.role,{
        expires: 7,
      });
      router.push("/dashboard");
    }else {
      alert("Invalid credentials");
    }
  
  }

  return (
    <div className="max-w-sm mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          className="border border-[#2dc67cb6] hover:border-[#2dc67b] p-2 text-sm w-full mb-4 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          className="border border-[#2dc67cb6] hover:border-[#2dc67b] p-2 text-sm w-full mb-4 rounded-md"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          // onClick={sendOtp}
          className="w-full bg-[#2dc67ce8] hover:bg-[#2dc67b] text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
