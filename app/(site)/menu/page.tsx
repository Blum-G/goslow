import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Menu",
  description:
    "Le menu du Bar Restaurant Go Slow à Atakpamé : plats locaux et classiques, avec les prix.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <main className="container-page py-24">
      <h1>Menu</h1>
    </main>
  );
}
