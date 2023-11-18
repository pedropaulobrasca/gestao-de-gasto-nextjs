import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/components/providers";

import "./globals.css";

const firaCode = Fira_Code({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Simple Expense",
  description: "Simple Expense Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body className={firaCode.className}>{children}</body>
        </ThemeProvider>
      </html>
    </Providers>
  );
}
