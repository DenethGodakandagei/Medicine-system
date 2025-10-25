import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "./components/Navbar";
import AIChatBot from "./components/AIChatBot";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "MediCare",
  description: "MediCare built with next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <AIChatBot />
          {/* </AuthProvider> */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fff",
                color: "#333",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
