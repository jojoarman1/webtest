import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sfProDisplayBold = localFont({
  src: [
    { path: "/fonts/SFProDisplay-Bold.woff2", weight: "700" },
    { path: "/fonts/SFProDisplay-Bold.woff", weight: "700" },
  ],
  variable: "--font-sf-pro-bold",
});

const sfProDisplayHeavy = localFont({
  src: [
    { path: "/fonts/SFProDisplay-Heavy.woff2", weight: "800" },
    { path: "/fonts/SFProDisplay-Heavy.woff", weight: "800" },
  ],
  variable: "--font-sf-pro-heavy",
});

const sfProDisplayLight = localFont({
  src: [
    { path: "/fonts/SFProDisplay-Light.woff2", weight: "300" },
    { path: "/fonts/SFProDisplay-Light.woff", weight: "300" },
  ],
  variable: "--font-sf-pro-light",
});

const sfProDisplayMedium = localFont({
  src: [
    { path: "/fonts/SFProDisplay-Medium.woff2", weight: "500" },
    { path: "/fonts/SFProDisplay-Medium.woff", weight: "500" },
  ],
  variable: "--font-sf-pro-medium",
});

const sfProDisplayRegular = localFont({
  src: [
    { path: "/fonts/SFProDisplay-Regular.woff2", weight: "400" },
    { path: "/fonts/SFProDisplay-Regular.woff", weight: "400" },
  ],
  variable: "--font-sf-pro-regular",
});

const sfProDisplaySemibold = localFont({
  src: [
    { path: "/fonts/SFProDisplay-Semibold.woff2", weight: "600" },
    { path: "/fonts/SFProDisplay-Semibold.woff", weight: "600" },
  ],
  variable: "--font-sf-pro-semibold",
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
        className={`${sfProDisplayBold.variable} ${sfProDisplayHeavy.variable} ${sfProDisplayLight.variable} ${sfProDisplayMedium.variable} ${sfProDisplayRegular.variable} ${sfProDisplaySemibold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
