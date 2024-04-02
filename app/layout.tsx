import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import TanstackQueryClientProvider from "@/tanstack-query-client-provider/TanstackQueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion Clone",
  description:
    "The connected workspace where everything takes place without delays",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <TanstackQueryClientProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
              storageKey='jotion-theme-2'
            >
              <Toaster position='bottom-center' />
              {children}
              <ReactQueryDevtools />
            </ThemeProvider>
          </TanstackQueryClientProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
