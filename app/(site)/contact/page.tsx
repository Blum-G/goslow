import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Adresse, horaires et contact du Bar Restaurant Go Slow à Atakpamé.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="container-page py-24">
      <h1>Contact</h1>
    </main>
  );
}
