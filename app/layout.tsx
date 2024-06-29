import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MyRuntimeProvider } from "@/app/MyRuntimeProvider";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pobi",
  description: "news analyzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyRuntimeProvider>
      <html lang="en" className="h-full">
        <body className={cn(inter.className, "h-full")}>{children}</body>
      </html>
    </MyRuntimeProvider>
  );
}
