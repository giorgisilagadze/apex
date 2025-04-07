import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "apex.ge",
  description: "Apex",
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
