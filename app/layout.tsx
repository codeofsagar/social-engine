
import "./globals.css";
import { Header, } from "@/components";
import { Footer } from '@/components'
import { constructMetaData } from "@/utils/metadata";
import { ReactLenis } from "lenis/react";

import Script from "next/script";

export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root>
      <html lang="en">
         <head>
          <link
            href="https://db.onlinewebfonts.com/c/0b5ecd0afcf95185925504cdca01f5e3?family=Druk+Wide+Cy+Web+Bold+Regular"
            rel="stylesheet"
          />
        </head>
        <body className="bg-bridal-health text-trace-ash">
          <Header />
          {children}
          <Footer />
         
         
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
                fbq('init', '51801872390518');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=518018723905148&ev=PageView&noscript=1"
            />
          </noscript>
        </body>
      </html>
    </ReactLenis>
  );
}
