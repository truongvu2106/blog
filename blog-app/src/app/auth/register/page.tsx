"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { AuthService } from "@/services/auth";
import { ROUTES } from "@/config/route";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AuthService.register(form);
      alert("Registration successful!");
      // You can redirect to the login page
      window.location.href = ROUTES.LOGIN;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-bold">Sign up</h2>
        {error && <p className="text-red-500">{error}</p>}

        <p className="text-center text-gray-500">Create your account</p>

        {/* OAuth Buttons */}
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 rounded-md border p-2 text-gray-700 hover:bg-gray-50"
        >
          <Image
            src="/assets/images/google-icon.svg"
            width={22}
            height={22}
            alt="Google Icon"
          />
          Sign up with Google
        </button>

        <button
          onClick={() => signIn("github")}
          className="w-full flex items-center justify-center gap-2 rounded-md border p-2 text-gray-700 hover:bg-gray-50"
        >
          <Image
            src="/assets/images/github-icon.svg"
            width={22}
            height={22}
            alt="Github Icon"
            className="h-5 w-5"
          />
          Sign up with Github
        </button>

        <div className="relative flex items-center justify-center">
          <span className="absolute left-0 w-1/4 border-b"></span>
          <span className="px-2 text-gray-500 bg-white">Or sign up with email</span>
          <span className="absolute right-0 w-1/4 border-b"></span>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border p-2"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border p-2"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border p-2"
              placeholder="Confirm password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black p-2 text-white hover:bg-gray-800"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already a member?{" "}
          <a href="/signin" className="text-blue-600">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
