"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAuth } from "@/app/contexts/AuthContext";
import { auth } from "@/lib/firebase.init";
import { useTheme } from "next-themes";
import Spinner from "./Spinner";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";
  const emoji = theme === "dark" ? "🌞" : "🌙";
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleAddProductClick = (e) => {
    setLoading(true);
    if (!user) {
      e.preventDefault();
      router.push("/login");
    }
    setTimeout(() => setLoading(false), 100);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const toggleTheme = () => {
    setTheme(nextTheme);
    // document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="sticky top-0 shadow bg-white dark:bg-gray-900 z-50">
      <div className="flex justify-between items-center py-2 px-4 lg:px-[200px]">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleClick}
          className="text-2xl font-bold text-blue-60 w-[200px] dark:text-blue-400"
        >
          🏡 <span>Mini Shop</span>

        </Link>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex w-full items-center relative">
          {/* Centered Routes */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 text-xl">
            <Link
              href="/products"
              onClick={handleClick}
              className="hover:text-blue-500 font-semibold dark:hover:text-blue-300"
            >
              All Products
            </Link>
            <Link
              href="/dashboard/add-product"
              onClick={handleAddProductClick}
              className="hover:text-blue-500 font-semibold dark:hover:text-blue-300"
            >
              Add Product
            </Link>
          </div>

          {/* Right Side: Auth + Theme */}
          <div className="absolute right-0 flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 border border-blue-500 text-white rounded-lg hover:bg-green-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-700 dark:text-gray-200 font-medium">
                  {user.displayName || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
            <button
              className="px-3 py-1 shadow-lg rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {emoji}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 text-lg">
          <Link href="/products" onClick={handleClick}>
            All Products
          </Link>
          <Link href="/dashboard/add-product" onClick={handleAddProductClick}>
            Add Product
          </Link>
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <>
              <span>{user.displayName || "User"}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
          <button onClick={toggleTheme}>{emoji} Theme</button>
        </div>
      )}

      {loading && <Spinner />}
    </nav>
  );
}