import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  
  try {
    // Use the API Ninjas API to get dynamic data
    const apiResponse = await axios.get(
      "https://api.api-ninjas.com/v1/hobbies?category=general",
      {
        headers: {
          "X-Api-Key": "LycWVug7D+o+/1fL06QGfg==vsIWd045EBPo73Zm",
        },
      }
    );
    
    const hobbyData = apiResponse.data[0]; // Get first hobby
    const hobbyName = hobbyData?.hobby || 'Web Development';
    const hobbyLink = hobbyData?.link || 'https://example.com';
    
    // Create dynamic meta tags based on the hobby
    const dynamicTitle = `${hobbyName} - WebPage Builder`;
    const dynamicDescription = `Discover amazing ${hobbyName} resources and create your perfect landing page with WebPage Builder`;
    
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Dynamic Meta Tags -->
    <title>${dynamicTitle}</title>
    <meta name="description" content="${dynamicDescription}" />
    <meta name="keywords" content="${hobbyName}, landing page, website builder" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="WebPage Builder" />
    <meta property="og:title" content="${dynamicTitle}" />
    <meta property="og:description" content="${dynamicDescription}" />
    <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/handydash-75858.appspot.com/o/website-builder%2Fmy-website%2Fimages%2F1759749172888?alt=media&token=d9717e34-6158-4031-8e8b-5106da63fb6e" />
    <meta property="og:url" content="https://yourdomain.com/backend/web/web-page-builder/website/${id}" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${dynamicTitle}" />
    <meta name="twitter:description" content="${dynamicDescription}" />
    <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/handydash-75858.appspot.com/o/website-builder%2Fmy-website%2Fimages%2F1759749172888?alt=media&token=d9717e34-6158-4031-8e8b-5106da63fb6e" />
    
    <!-- Redirect to actual React app -->
    <script>
      setTimeout(() => {
        window.location.href = '/#/backend/web/web-page-builder/website/${id}';
      }, 100);
    </script>
  </head>
  <body>
    <div>Loading ${hobbyName} page...</div>
    <p>Redirecting to your amazing ${hobbyName} landing page...</p>
  </body>
</html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
    
  } catch (error) {
    console.error('API Error:', error);
    
    // Fallback HTML if API fails
    const fallbackHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Website ${id} - WebPage Builder</title>
    <meta name="description" content="Custom landing page for website ${id}" />
    <meta property="og:title" content="Website ${id} - WebPage Builder" />
    <meta property="og:description" content="Custom landing page for website ${id}" />
    <script>window.location.href = '/#/backend/web/web-page-builder/website/${id}';</script>
  </head>
</html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(fallbackHtml);
  }
}