import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner';
import { Providers } from "@/components/Provider";

export const metadata: Metadata = {
  title: "EduMastery",
  description: "Your Path to Knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-primary`}>
          <Providers>
          {children}
          </Providers>
          <Toaster />
        
      </body>
    </html>
  );
}