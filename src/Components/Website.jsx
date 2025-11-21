import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "@dr.pogodin/react-helmet";
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
    const updateMetaTags = () => {
      document.title = meta.title;
      
      // Update description
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.name = 'description';
        document.head.appendChild(descMeta);
      }
      descMeta.content = meta.description;
      
      // Update Open Graph tags
      ['og:title', 'og:description', 'og:image', 'og:url'].forEach(property => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        metaTag.content = meta[property.replace('og:', '')] || meta.title || meta.description;
      });
    };
    
    updateMetaTags();
  }, [meta]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeta((prev) => ({
      ...prev,
      url: window.location.href,
    }));
  }, [location]);

  return (
    <>
    {/* Meta Tags with @dr.pogodin/react-helmet */}
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:site_name" content="WebPage Builder" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        
        {/* Canonical */}
        <link rel="canonical" href={meta.url} />
      </Helmet>

      {/* Debug Info - Remove in production */}
     {import.meta.env.MODE === 'development' && (
  <Box 
    sx={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      borderRadius: '0 0 8px 0'
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
      Meta Debug:
    </Typography>
    <Typography variant="caption" sx={{ display: 'block' }}>
      Title: {meta.title}
    </Typography>
    <Typography variant="caption" sx={{ display: 'block' }}>
      Desc: {meta.description.substring(0, 50)}...
    </Typography>
  </Box>
)}
      <h1>{meta?.title}</h1>
      <h2>{meta?.description} </h2>
      <h3>{meta.keywords}</h3>
    </>
  );
};

export default Website;
