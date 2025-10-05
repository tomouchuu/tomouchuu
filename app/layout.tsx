import { ThemeProvider } from "@/components/providers/theme-provider";
import Toggles from "@/components/toggles";
import QueryProvider from "@/components/providers/query-provider";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import type { Metadata } from "next";

import "@/globals.css";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: {
    template: "%s | Thomas@Uchuu",
    default: "Thomas@Uchuu",
  },
  description: "Site for Thomas(Tomo)",
  icons: {
    icon: {
      url: "/images/thomas.jpg",
      type: "image/jpeg",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              <Toggles />
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
