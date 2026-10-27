import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Réserver une table",
  description:
    "Réservez une table au Bar Restaurant Go Slow à Atakpamé. Votre demande est envoyée sur WhatsApp.",
  path: "/reserver",
});

export default function ReserverPage() {
  return (
    <main className="container-page py-24">
      <h1>Réserver une table</h1>
    </main>
  );
}
