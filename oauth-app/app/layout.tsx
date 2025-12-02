import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OAuth Login Demo",
  description: "GitHub OAuth demo using Next.js App Router routing concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased kwabena-bg`}>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <header className="border-b bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <div className="text-lg font-semibold text-blue-700">kwabena OAuth</div>
              <Nav />
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 py-12 kwabena-watermark">{children}</main>
          <footer className="text-center py-4 text-xs text-slate-500 opacity-80">
            &copy; {new Date().getFullYear()} kwabena &mdash; All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
