import type { SiteSettings } from "./types";

export const defaultSettings: SiteSettings = {
  name: "Bar Restaurant Go Slow",
  city: "Atakpamé, Togo",
  address: "Atakpamé, Togo",
  phone: "90000000",
  whatsappNumber: "22890000000",
  mapsLink: "https://maps.app.goo.gl/BsTbSbsZThnK3iMM6?g_st=aw",
  plusCode: "G4CQ+5XV",
  coordinates: {
    lat: 7.5199662,
    lng: 1.1402761,
  },
  openingHours: [
    { day: "Lundi", open: "08:00", close: null },
    { day: "Mardi", open: "08:00", close: null },
    { day: "Mercredi", open: "08:00", close: null },
    { day: "Jeudi", open: "08:00", close: null },
    { day: "Vendredi", open: "08:00", close: null },
    { day: "Samedi", open: "08:00", close: null },
    { day: "Dimanche", open: null, close: null },
  ],
  deliveryText:
    "Livraison dans Atakpamé et ses environs. Les frais vous sont confirmés sur WhatsApp.",
  facebookUrl: null,
  slogan: "Bonne cuisine • Bon moment",
};
