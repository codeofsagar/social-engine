import "./globals.css";
import { Header, Footer } from "@/components";
import { constructMetaData } from "@/utils/metadata";
import Script from "next/script";
import SmoothScroll from "../components/SmoothScroll"; // Import the component we made in Step 1

export const metadata = constructMetaData();

// CHECK THIS: Your original code had two different IDs. 
// One ended in '18' and one in '148'. I have used the '148' version here.
const FB_PIXEL_ID = "518018723905148"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Recommended: Use next/font/google instead of manual links if possible */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Zalando+Sans:ital,wdth,wght@0,100.9,900;1,100.9,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bridal-health text-trace-ash">
        
        {/* Wrap content in the Client Component */}
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>

        {/* Facebook Pixel Script */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        
        {/* NoScript Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt="facebook pixel"
          />
        </noscript>
      </body>
    </html>
  );
}