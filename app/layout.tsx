import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pallecarte.ge",
  description: "Pallecarte",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
