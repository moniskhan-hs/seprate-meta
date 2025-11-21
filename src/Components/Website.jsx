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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMeta((prev) => ({
      ...prev,
      url: window.location.href,
    }));
  }, [location]);

  return (
    <>

      <h1>{meta?.title}</h1>
      <h2>{meta?.description} </h2>
      <h3>{meta.keywords}</h3>
    </>
  );
};

export default Website;
