import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import ContextProvider from "./context";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Health Challenge 2025",
  description: "The biggest health challenge of 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          <ContextProvider>{children}</ContextProvider>
        </Providers>
      </body>
    </html>
  );
}
