import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Website = () => {
  const { id } = useParams();

  // AFTER
  const [meta, setMeta] = useState({
    title: "WebPage Builder - Create Professional Landing Pages",
    description:
      "Create professional landing pages quickly and easily without any coding knowledge. Customize and deploy in minutes!",
    image:
      "https://firebasestorage.googleapis.com/v0/b/handydash-75858.appspot.com/o/website-builder%2Fmy-website%2Fimages%2F1759749172888?alt=media&token=d9717e34-6158-4031-8e8b-5106da63fb6e",
    url: window.location.href,
    keywords: "landing page, website builder, no code, react, vite",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.api-ninjas.com/v1/hobbies?category=general",
          {
            headers: {
              "X-Api-Key": "LycWVug7D+o+/1fL06QGfg==vsIWd045EBPo73Zm",
            },
          }
        );
        const link = res.data?.link;
        const hobbyName = res.data?.hobby;
        setMeta({
          title: hobbyName || 'WebPage Builder',
          description: `${hobbyName} ${link}` ,
          image: "website image" , 
          url: window.location.href,
          keywords: link || 'landing page, website builder, no code'
        });
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeta((prev) => ({
      ...prev,
      url: window.location.href,
    }));
  }, [location]);

  return (
    <>
    <Helmet>
  {/* Basic Meta Tags */}
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta name="keywords" content={meta.keywords} />
  <link rel="canonical" href={meta.url} />
  
  {/* Open Graph Meta Tags (Facebook, LinkedIn, etc.) */}
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.image} />
  <meta property="og:url" content={meta.url} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="WebPage Builder" />
  
  {/* Twitter Meta Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
  <meta name="twitter:site" content="@yourhandle" />
  
  {/* Additional Meta Tags */}
  <meta name="robots" content="index, follow" />
  <meta name="author" content={meta?.title || "WebPage Builder"} />
  
  {/* Structured Data for SEO */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": meta.url,
      "image": meta.image,
      "publisher": {
        "@type": "Organization",
        "name": "WebPage Builder"
      }
    })}
  </script>
</Helmet>
      <h1>Website page {id}</h1>
    </>
  );
};

export default Website;
