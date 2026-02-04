import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: Record<string, any>;
  noIndex?: boolean;
}

export const SEO = ({ 
  title = "Dedgrl's Showcase | Creative Portfolio 2025-2026", 
  description = "Welcome to my creative showcase - a collection of visual art by Dedgrl", 
  image = "https://i.pinimg.com/736x/43/7e/77/437e774e77cfe62271ca27506a46b910.jpg", 
  url = "https://davitegoian.github.io/art-portfolio",
  type = "website",
  structuredData,
  noIndex = false
}: SEOProps) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
