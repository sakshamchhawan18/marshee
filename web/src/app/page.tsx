"use client"
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verified, setVerified] = useState(false);
  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });
      if (response.ok) {
        setOtpSent(true);
      } else {
        setError("Failed to send OTP");
      }
    } catch (err) {
      setError("An error occurred while sending OTP");
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      if (response.ok) {
        setVerified(true);
      } else {
        setError("Failed to verify OTP");
      }
    } catch (err) {
      setError("An error occurred while verifying OTP");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="font-bold text-3xl">Login</h1>
        {!otpSent && (
          <div>
            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" type="text" className="border-2 p-2 m-2 border-gray-300" />
            <button onClick={handleSendOtp} className="bg-green-500 p-2 m-2 rounded-md">Send OTP</button>
          </div>
        )}
        {otpSent && (
          <div>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" type="text" className="border-2 p-2 m-2 border-gray-300" />
            <button onClick={handleVerifyOtp} className="bg-green-500 p-2 m-2 rounded-md">Verify OTP</button>
          </div>
        )}
        <div>
          <p>Or</p>
          <div>
            <button>Login with Google</button>
          </div>
        </div>
        <p>
          Dont have an account? <Link href="/register">Register</Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </main>
  );
}
