import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Elijah Hausman",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("dark h-full w-full font-sans antialiased", inter.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-zinc-900">{children}</body>
    </html>
  );
}
