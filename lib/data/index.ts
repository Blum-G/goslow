import { defaultCategories, defaultDishes } from "./default-dishes";
import { defaultSettings } from "./default-settings";
import type { Category, Dish, SiteSettings } from "./types";

export async function getDishes(): Promise<Dish[]> {
  return [...defaultDishes];
}

export async function getDishBySlug(slug: string): Promise<Dish | null> {
  return defaultDishes.find((dish) => dish.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  return defaultCategories
    .filter((category) =>
      defaultDishes.some((dish) => dish.category === category.name),
    )
    .sort((a, b) => a.order - b.order)
    .map((category) => ({ ...category }));
}

export async function getSettings(): Promise<SiteSettings> {
  return defaultSettings;
}
