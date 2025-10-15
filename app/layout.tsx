import FlashOverlay from "@/components/FlashOverlay";
import type { Metadata } from "next";
import Script from "next/script";

// export const metadata: Metadata = {
//   title: "apexd.ge",
//   description: "Apex",
// };

// export async function generateMetadata({
//   params,
// }: {
//   params: { lang?: string };
// }): Promise<Metadata> {
//   // Check if the language parameter indicates Georgian (e.g., 'ge' or 'ka').
//   // Defaulting to English if the parameter is missing or not Georgian.

//   console.log(params.lang);

//   const isGeorgian = params.lang === "ge" || params.lang === "ka";

//   const description = isGeorgian
//     ? "სამშენებლო კომპანია"
//     : "Real Estate Company";

//   return {
//     title: "APEX Development",
//     description: description,
//   };
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <meta
          name="google-site-verification"
          content="AXAhKzxNqO4CU9YrtURcg0mcFOpk_BnO-SXQKboQJko"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G1MCKPQQBF"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-G1MCKPQQBF');`}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17613303036"
          strategy="afterInteractive"
        />
        <Script id="gtag-aw" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-17613303036');`}
        </Script>

        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '896444055820528');
  fbq('track', 'PageView');`}
        </Script>

        <Script id="clarity" strategy="beforeInteractive">
          {`(function(c,l,a,r,i,t,y){
      if (c[a]) return; // 🛡 Prevent running twice
      c[a]=function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "tiuaado89j");`}
        </Script>
      </head>

      <body>
        {children} <FlashOverlay />
      </body>
    </html>
  );
}
