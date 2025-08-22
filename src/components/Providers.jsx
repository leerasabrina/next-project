"use client";

import { AuthProvider } from "@/app/contexts/AuthContext";
import { ThemeProvider } from "next-themes";


export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}