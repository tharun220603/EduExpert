import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import PageTransition from "@/components/PageTransition";
import WhatsAppButton from "@/components/WhatsAppButton"; // This now contains both Call & WA

export const metadata: Metadata = {
  title: "EduExpert – Discover Top Southern Indian Colleges",
  description:
    "Find the best colleges, exams, and courses in South India. Loyola, VIT, Amrita, IIT Madras, NIT Trichy and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <CursorGlow />
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <WhatsAppButton />
        <GoogleTagManager gtmId="GTM-GTM-TDFFM8DN" />

        <Footer />
      </body>
    </html>
  );
}
