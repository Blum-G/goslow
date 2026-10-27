import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoUiClient } from "./DemoUiClient";

export const metadata: Metadata = {
  title: "Bibliothèque de composants UI",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PageDemonstrationUi() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <DemoUiClient />;
}
