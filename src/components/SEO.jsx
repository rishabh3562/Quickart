import Head from 'next/head';

const SEO = ({ title, description, keywords, url }) => {
    const defaultTitle = "Quickart - Your One-Stop Online Store";
    const defaultDescription = "Shop the best products at unbeatable prices on Quickart.";
    const defaultKeywords = "Quickart, online store, ecommerce, shopping, fashion, electronics";
    const defaultUrl = "https://coneixement-assignment-frontend.vercel.app";

    return (
        <Head>
            <title>{title ? `${title} - Quickart` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={url || defaultUrl} />
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:url" content={url || defaultUrl} />
            <meta property="og:type" content="website" />
        </Head>
    );
};

export default SEO;
