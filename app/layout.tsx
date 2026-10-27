import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Quicksand } from "next/font/google";
import { SITE_URL, genererJsonLdRestaurant } from "@/lib/seo";
import { IS_INDEXING_ENABLED } from "@/lib/config";
import { getSettings } from "@/lib/data";
import { DefilementFluide } from "@/components/motion/DefilementFluide";
import { NotificationProvider } from "@/components/ui/Notification";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BarreActionsMobile } from "@/components/layout/BarreActionsMobile";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Bar Restaurant Go Slow à Atakpamé | Plats locaux, boissons & livraison",
    template: "%s | Go Slow Atakpamé",
  },
  description:
    "Bar restaurant à Atakpamé au Togo. Cuisine locale authentique, Foufou, Ayimolou, grillades et service de livraison. Réservez votre table ou commandez sur WhatsApp.",
  robots: IS_INDEXING_ENABLED
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F26A1B",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const settings = await getSettings();
  const schemaRestaurant = genererJsonLdRestaurant();

  return (
    <html lang="fr" className={quicksand.variable}>
      <body className="flex min-h-svh flex-col bg-[var(--color-creme)] text-[var(--color-anthracite)]">
        <NotificationProvider>
          <DefilementFluide />
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <BarreActionsMobile telephone={settings.phone} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schemaRestaurant),
            }}
          />
        </NotificationProvider>
      </body>
    </html>
  );
}
