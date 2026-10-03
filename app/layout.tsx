import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TFC Investment Lab",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
