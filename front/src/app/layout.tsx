import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { AuthProvider } from "./lib/auth-context";
import Navbar from "../components/nav/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Marginalia",
  description: "Notes in the margin, worth sharing.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-backgreound font-sans transition-bg">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
          <footer className="w-full border-t border-border px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-8 md:py-8 lg:px-16">
            <div className="flex flex-col gap-3 text-start text-xs tracking-wide text-muted sm:flex-row sm:items-end sm:justify-between md:text-sm">
              <div className="flex flex-col gap-1">
                <span className="font-fraunces text-xl tracking-normal text-foreground md:text-2xl">
                  marginalia<span className="text-accent">.</span>
                </span>
                <span>Notes in the margins, worth sharing.</span>
              </div>

              <span className="font-light sm:text-right">
                Built with love by{" "}
                <Link
                  className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/Hekimianz"
                >
                  Aram Hekimian
                </Link>
              </span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
