export type PropertyType =
  | "residential-sale"
  | "residential-rent"
  | "commercial-sale"
  | "commercial-lease"
  | "business"
  | "project";

export interface PropertyAmenity {
  name: string;
  category: "school" | "transport" | "café" | "beach" | "shops" | "park" | "hospital";
  distance: string;
}

export interface Property {
  id: string;
  type: PropertyType;
  title: string;
  address: string;
  suburb: string;
  price: string;
  beds?: number;
  baths?: number;
  cars?: number;
  landSize?: string;
  buildingSize?: string;
  description: string;
  longDescription?: string;
  image: string;
  photos?: string[];
  floorPlan?: string;
  features?: string[];
  amenities?: PropertyAmenity[];
  featured?: boolean;
  tag?: string;
  openHome?: string;      // e.g. "Sat 24 May, 10:00–10:30am"
  virtualTour?: boolean;
  agent?: string;
  agentPhone?: string;
}

export interface Project {
  id: string;
  title: string;
  suburb: string;
  address: string;
  type: "off-the-plan" | "small-development" | "marketing";
  status: "selling" | "upcoming" | "sold-out";
  units?: number;
  priceFrom: string;
  completion?: string;
  description: string;
  image: string;
  features: string[];
}

export interface Suburb {
  slug: string;
  name: string;
  lga: string;
  description: string;
  longDescription: string;
  medianHouse: string;
  medianUnit: string;
  medianRent: string;
  annualGrowth: string;
  daysOnMarket: number;
  population: string;
  distanceFromSydney: string;
  highlights: string[];
  schools: string[];
  amenities: string[];
  image: string;
  demandLevel: "Very High" | "High" | "Moderate";
}

export interface TeamMember {
  name: string;
  role: string;
  phone: string;
  email: string;
  bio?: string;
  image: string;
}

export interface Testimonial {
  name: string;
  suburb: string;
  text: string;
  service: string;
}
