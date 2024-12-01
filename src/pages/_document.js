import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta Tags */}
        <meta name="description" content="Quickart - Your One-Stop Online Store for Best Deals on Electronics, Fashion & More" />
        <meta name="keywords" content="Quickart, online store, ecommerce, shopping, electronics, fashion, home appliances, deals" />
        <meta name="robots" content="index, follow" />
        <meta name="Rishabh Dubey" content="Quickart Team" />

        {/* Open Graph Meta Tags (For Social Media) */}
        <meta property="og:title" content="Quickart - Your One-Stop Online Store" />
        <meta property="og:description" content="Shop the best deals on electronics, fashion, and more at Quickart." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" /> {/* Update with your image */}
        <meta property="og:url" content="https://coneixement-assignment-frontend.vercel.app/" />
        <meta property="og:site_name" content="Quickart" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Quickart" />
        <meta name="twitter:title" content="Quickart - Your One-Stop Online Store" />
        <meta name="twitter:description" content="Shop for the best deals at Quickart on electronics, fashion, and more!" />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Apple Touch Icon for iOS */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest File for PWA (Progressive Web App) */}
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data - JSON-LD (For Rich Snippets) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Quickart",
                "url": "https://coneixement-assignment-frontend.vercel.app/",
                "logo": "https://coneixement-assignment-frontend.vercel.app/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+123456789",
                  "contactType": "Customer Service"
                }
              }
            `,
          }}
        ></script>

        {/* Google Fonts (if any) */}
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

        {/* Additional SEO Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://coneixement-assignment-frontend.vercel.app/" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
