import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import CustomToast from "@/components/CustomToast";
import Call from "@/components/Call";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  [];

  const messages = await getMessages();
  return (
    <div>
      <NextIntlClientProvider messages={messages}>
        <Call />
        <CustomToast />
        <Header />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
