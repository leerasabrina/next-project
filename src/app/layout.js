import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

export const metadata = { title: "Mini Shop", description: "Next.js mini shop" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster position="top-center" />
          <Navbar />
          <main style={{ minHeight: "70vh" }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}