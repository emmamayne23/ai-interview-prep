import type { Metadata } from "next";
import { Bricolage_Grotesque, Montserrat } from "next/font/google";
import "./globals.css";

const bricolage = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview SideKick",
  description: "Get ready for your next job interview!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={bricolage.className}
      >
        {children}
      </body>
    </html>
  );
}
