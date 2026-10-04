import type { Metadata } from "next";
import "./globals.css";
import {PortfolioProvider} from "@/components/portfolio-provider";

export const metadata: Metadata = {
  title: "TFC Invest Lab",
  description: "Build a portfolio. Explore risk. See what changes. A Teen Finance Club portfolio allocation tool.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/tfc-logo.png",
    shortcut: "/tfc-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><PortfolioProvider>{children}</PortfolioProvider></body>
    </html>
  );
}
