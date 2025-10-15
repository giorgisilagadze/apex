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

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale;

  const isGeorgian = locale === "ka";

  const title = isGeorgian
    ? "APEX Development - სამშენებლო კომპანია"
    : "APEX Development - Real Estate Company";

  const description = isGeorgian
    ? "სამშენებლო კომპანია"
    : "Real Estate Company";

  return {
    title: title,
    description: description,
  };
}

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
