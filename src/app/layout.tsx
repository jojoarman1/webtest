import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/PlusJakartaSans-Bold.woff",
  variable: "--font-geist-sans",
  weight: "700", // Измените на доступный вес, если необходимо
});
const geistMono = localFont({
  src: "./fonts/PlusJakartaSans-Regular.woff",
  variable: "--font-geist-mono",
  weight: "400", // Измените на доступный вес, если необходимо
});

export const metadata: Metadata = {
  title: "TonBankHub",
  description: "GetTon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
