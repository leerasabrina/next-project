"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase.init";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/products"); 
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // MongoDB তে user save
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        }),
      });

      router.push("/"); 
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex-col h-[300px] w-[400px] lg:ml-[500px] md:mt-20  flex justify-center items-center shadow-md ">
        <div className="border border-gray-50 h-[500px]">
      <form onSubmit={handleLogin} className=" px-6 py-2 rounded  w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div className="px-5">
      <button
        onClick={handleGoogleLogin}
        className=" w-full py-2 mb-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Login with Google
      </button></div>
      </div>
    </div>
  );
}
