
"use client";

import React, { useState } from 'react';
import { auth } from '@/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';

export default function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const sendOtp = async () => {
    setLoading(true);
    setMsg('');

    // Ensure 10 digits only
    if (!/^\d{10}$/.test(phone)) {
      setMsg('❗ Please enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }

    try {
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
        size: 'invisible',
      });

      const fullPhone = `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setStep(2);
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
    setLoading(false);
  };

  const verifyOtpAndRegister = async () => {
    setLoading(true);
    setMsg('');

    try {
      const result = await confirmationResult.confirm(otp);
      const uid = result.user.uid;
      const phoneNumber = result.user.phoneNumber;

      await axios.post('http://localhost:5001/api/auth/register', {
        uid,
        phone: phoneNumber,
        password,
      });

      setMsg('✅ Registered successfully!');
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">📱 Register with Phone</h1>

      {step === 1 && (
        <>
          <label className="block mb-1 text-sm font-medium">Phone Number (+91)</label>
          <input
            className="border w-full p-2 mb-3"
            placeholder="9876543210"
            maxLength={10}
            value={phone}
            onChange={(e) => {
              const onlyDigits = e.target.value.replace(/\D/g, '');
              setPhone(onlyDigits);
            }}
          />
          <input
            className="border w-full p-2 mb-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-1 text-sm font-medium">Enter OTP</label>
          <input
            className="border w-full p-2 mb-3"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={verifyOtpAndRegister}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify & Register'}
          </button>
        </>
      )}

      <div id="recaptcha"></div>

      {msg && <p className="mt-4 text-sm text-red-600">{msg}</p>}
    </div>
  );
}
