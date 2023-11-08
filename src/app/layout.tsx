import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers";

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
    <ClerkProvider>
      <Providers>
        <html lang="en" suppressHydrationWarning>
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
    </ClerkProvider>
  );
}
