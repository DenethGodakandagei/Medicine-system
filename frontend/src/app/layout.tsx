import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "MediCare",
  description: "MediCare built with next.js"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar/>
          <main>{children}</main>
          </AuthProvider>
      </body>
    </html>
  );
}
