export interface Dish {
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
  signature: boolean;
}

export interface Category {
  name: string;
  slug: string;
  order: number;
}

export interface OpeningHours {
  day: string;
  open: string | null;
  close: string | null;
}

export interface SiteSettings {
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  mapsLink: string;
  plusCode: string | null;
  coordinates: { lat: number; lng: number } | null;
  openingHours: OpeningHours[];
  deliveryText: string;
  facebookUrl: string | null;
  slogan: string;
}
