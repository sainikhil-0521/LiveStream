"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Signup successful!");
        router.push("/login");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        const errorMessage =
          error.response.data?.message?.[0]?.messages?.[0]?.message ||
          "An error occurred";
        console.log(errorMessage);
        toast.error(errorMessage);
      } else {
        // console.error("Error signing up:", error.message);
        toast.error("Error signing up");
      }
    }
  };

  useEffect(() => {
    if (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    ) {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  }, [username, email, password, confirmPassword]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">User Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitButtonDisabled}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${
              submitButtonDisabled && "cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center items-center mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Sign in with Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500">
            Already have an account? Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
