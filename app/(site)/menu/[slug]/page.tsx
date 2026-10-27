import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDishBySlug, getDishes } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

type DishPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({ slug: dish.slug }));
}

export async function generateMetadata({
  params,
}: DishPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dish = await getDishBySlug(slug);

  if (!dish) {
    return { title: "Plat introuvable" };
  }

  return buildMetadata({
    title: dish.name,
    description: dish.description,
    path: `/menu/${dish.slug}`,
  });
}

export default async function DishPage({ params }: DishPageProps) {
  const { slug } = await params;
  const dish = await getDishBySlug(slug);

  if (!dish) {
    notFound();
  }

  return (
    <main className="container-page py-24">
      <h1>{dish.name}</h1>
    </main>
  );
}
