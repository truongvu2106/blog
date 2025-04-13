"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/route";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login failed:", result.error);
    } else {
      router.push(ROUTES.POSTS);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign in</h2>

        {/* OAuth Buttons */}
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center py-2 border rounded-lg mb-2"
        >
          <span className="mr-2">
            <Image
              src="/assets/images/google-icon.svg"
              width={22}
              height={22}
              alt="Google Icon"
            />
          </span>
          Sign in with Google
        </button>
        <button
          onClick={() => signIn("github")}
          className="w-full flex items-center justify-center py-2 border rounded-lg"
        >
          <span className="mr-2">
            <Image
              src="/assets/images/github-icon.svg"
              width={22}
              height={22}
              alt="Github Icon"
            />
          </span>{" "}
          Sign in with GitHub
        </button>

        <div className="text-center text-sm text-gray-500 my-4">
          Or sign in with email
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-500">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500">
            Sign Up for Free
          </a>
        </p>
      </div>
    </div>
  );
}
