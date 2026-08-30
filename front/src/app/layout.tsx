import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Link from "next/link";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-backgreound font-sans transition-bg">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <footer className="mx-auto flex justify-between text-xs md:text-sm tracking-wide font-muted font-[300] px-2 py-2 max-w-3xl">
            <span>Marginalia</span>
            <span>
              Built with love by{" "}
              <Link
                className="hover:text-accent transition-all"
                target="_blank"
                href="https://github.com/Hekimianz"
              >
                Aram Hekimian
              </Link>
            </span>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
