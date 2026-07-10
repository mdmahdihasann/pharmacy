"use client";

import { useRef, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    index: number
  ) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
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

      toast.error(
        err?.response?.data?.message || "Failed"
      );

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


      const res = await api.post(
        "/auth/verify-otp",
        {
          fullName,
          email,
          otp,
        }
      );


      toast.success("Login Success");


      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      )
      if(user.role === "ADMIN"){
        router.push("/dashboard");
      }else{
        router.push("/");
      }

      

      


    } catch (err: any) {

      toast.error(
        err?.response?.data?.message || "Invalid OTP"
      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="
      max-w-md
      mx-auto
      mt-20
      rounded-2xl
      border
      bg-white
      p-8
      shadow-lg
    ">


      <h2 className="
        text-3xl
        font-bold
        mb-6
        text-center
      ">
        {
          step === "send"
          ? "Create Account"
          : "Verify OTP"
        }
      </h2>



      {/* Step 1 */}

      {
        step === "send" && (

          <>

            <input
              className="
                border
                rounded-xl
                p-3
                w-full
                mb-4
                outline-none
                focus:border-[#2dc67b]
                focus:ring-4
                focus:ring-[#2dc67b]/20
              "
              placeholder="Full Name"
              value={fullName}
              onChange={(e)=>setName(e.target.value)}
            />



            <input
              className="
                border
                rounded-xl
                p-3
                w-full
                mb-6
                outline-none
                focus:border-[#2dc67b]
                focus:ring-4
                focus:ring-[#2dc67b]/20
              "
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />



            <button
              onClick={sendOtp}
              disabled={loading}
              className="
                w-full
                bg-[#2dc67b]
                hover:bg-[#25ad69]
                text-white
                rounded-xl
                p-3
                font-semibold
                transition
              "
            >

              {
                loading
                ? "Sending..."
                : "Send OTP"
              }

            </button>


          </>

        )
      }





      {/* Step 2 */}

      {
        step === "verify" && (

          <>

            <p className="
              text-sm
              text-gray-500
              mb-6
              text-center
            ">
              OTP has been sent to
              <br />
              <b className="text-gray-800">
                {email}
              </b>
            </p>




            {/* Modern OTP Input */}

            <div className="
              flex
              justify-center
              gap-3
              mb-6
            ">

              {
                [0,1,2,3,4,5].map((index)=>(

                  <input
                    key={index}
                    ref={(el)=>{
                      otpRefs.current[index]=el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ""}
                    onChange={(e)=>
                      handleOtpChange(
                        e.target.value,
                        index
                      )
                    }
                    onKeyDown={(e)=>
                      handleOtpKeyDown(
                        e,
                        index
                      )
                    }
                    className="
                      w-12
                      h-14
                      rounded-xl
                      border
                      border-gray-300
                      text-center
                      text-2xl
                      font-bold
                      outline-none
                      transition
                      focus:border-[#2dc67b]
                      focus:ring-4
                      focus:ring-[#2dc67b]/20
                    "
                  />

                ))
              }

            </div>




            <button
              onClick={verifyOtp}
              disabled={loading}
              className="
                w-full
                bg-[#2dc67b]
                hover:bg-[#25ad69]
                text-white
                rounded-xl
                p-3
                font-semibold
              "
            >

              {
                loading
                ? "Verifying..."
                : "Verify OTP"
              }

            </button>




            <button
              onClick={sendOtp}
              className="
                w-full
                mt-3
                text-[#2dc67b]
                font-medium
              "
            >
              Resend OTP
            </button>



            <button
              onClick={()=>{
                setStep("send");
                setOtp("");
              }}
              className="
                w-full
                mt-2
                text-gray-500
              "
            >
              Change Email
            </button>


          </>

        )
      }

    </div>

  );
}