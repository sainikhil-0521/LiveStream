"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserProvider";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserDetails } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        setUserDetails(response?.data?.data ?? null);
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        console.log(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.error("Error logging in");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login In
          </button>
        </form>
        <div className="flex justify-center items-center mt-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">
            Sign in with Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="/signup" className="text-blue-500">
            New to ShowIt ? Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
