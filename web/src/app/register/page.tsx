"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: (Optional) Send OTP first
      const otpRes = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const otpData = await otpRes.json();
      if (!otpRes.ok) {
        throw new Error(otpData.message || 'OTP sending failed');
      }

      console.log('OTP sent:', otpData);

      // Step 2: Proceed to registration
      const registerRes = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const registerData = await registerRes.json();
      if (!registerRes.ok) {
        throw new Error(registerData.message || 'Registration failed');
      }

      console.log('Registration successful:', registerData);
      router.push('/');
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
