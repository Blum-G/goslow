import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Quicksand } from "next/font/google";
import { SITE_URL } from "@/lib/seo";
import { DefilementFluide } from "@/components/motion/DefilementFluide";
import { NotificationProvider } from "@/components/ui/Notification";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const isIndexingEnabled = process.env.NEXT_PUBLIC_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bar Restaurant Go Slow à Atakpamé",
    template: "%s | Go Slow Atakpamé",
  },
  description:
    "Plats locaux, boissons et livraison à Atakpamé. Foufou, Ayimolou, Poulet et bien plus. Réservez votre table ou commandez en livraison.",
  robots: isIndexingEnabled
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F26A1B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={quicksand.variable}>
      <body>
        <NotificationProvider>
          <DefilementFluide />
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
