import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Thomas Moore",
  description: "Portfolio / About etc. for Thomas Moore. UI Engineer from Essex, UK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
            {children}
            <footer className="text-center text-xs min-w-36">
              <Separator />
              <p className="mt-4">トー マス＠宇宙</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
