/**
 * AgentBox / Reapit Sales API client
 * Docs: https://api.agentboxcrm.com.au/docs
 */

const BASE = "https://api.agentboxcrm.com.au";
const VERSION = "2";

function headers() {
  return {
    "X-Client-ID": process.env.AGENTBOX_CLIENT_ID!,
    "X-API-Key": process.env.AGENTBOX_API_KEY!,
    Accept: "application/json",
  };
}

function url(path: string, params: Record<string, string> = {}) {
  const u = new URL(`${BASE}${path}`);
  u.searchParams.set("version", VERSION);
  for (const [k, v] of Object.entries(params)) {
    u.searchParams.set(k, v);
  }
  return u.toString();
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ABImage {
  id: string;
  url: string;
  title?: string;
  thumbnails?: { url: string; size: string }[];
}

export interface ABFloorPlan {
  id: string;
  url: string;
  pdfUrl?: string;
  title?: string;
}

export interface ABListing {
  id: string;
  type: string;           // "Sale" | "Lease"
  status: string;         // "Available" | "Sold" | "Leased" | "Under Offer"
  marketingStatus: string;
  method: string;
  displayPrice: string;
  soldPrice?: number;
  soldPriceHide?: boolean;
  soldPriceUndisclosed?: boolean;
  displaySoldPrice?: boolean;
  mainHeadline: string;
  listedDate: string;
  auctionDate: string;
  openHome?: string;
  inspectionType?: string;
  inspectionDates?: { id: string; startDate: string; endDate: string }[];
  description?: string;
  mainDescription?: string;
  property: {
    type: string;         // "Residential" | "Commercial"
    category: string;     // "House" | "Apartment" | "Land" etc
    address: {
      streetAddress: string;
      unitNum: string;
      streetNum: string;
      streetName: string;
      streetType: string;
      suburb: string;
      state: string;
      postcode: string;
      hideAddress: boolean;
    };
    bedrooms: string;
    bathrooms: string;
    totalParking: string;
    landArea: { value: string; unit: string };
    buildingArea: { value: string; unit: string };
  };
  mainImage?: ABImage;
  images?: ABImage[];
  floorPlans?: ABFloorPlan[];
  staff?: { firstName: string; lastName: string; phone: string; email: string }[];
}

export interface ABListingsResponse {
  items: string;
  current: string;
  last: string;
  listings: ABListing[];
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

export async function fetchListings(
  params: Record<string, string> = {},
  revalidate = 3600
): Promise<ABListingsResponse> {
  // mainImage is the correct include for list endpoint (images only works on detail)
  const res = await fetch(url("/listings", { include: "mainImage,description,inspectionDates", ...params }), {
    headers: headers(),
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`AgentBox error ${res.status}`);
  const data = await res.json();
  return data.response as ABListingsResponse;
}

export async function fetchAllListings(
  params: Record<string, string> = {},
  revalidate = 60
): Promise<ABListing[]> {
  const all: ABListing[] = [];
  let page = 1;
  let lastPage = 1;
  do {
    const data = await fetchListings({ ...params, page: String(page), limit: "100" }, revalidate);
    if (data.listings?.length) all.push(...data.listings);
    lastPage = parseInt(data.last ?? "1", 10) || 1;
    page++;
  } while (page <= lastPage);
  return all;
}

export async function fetchListing(id: string, revalidate = 3600): Promise<ABListing> {
  const res = await fetch(
    url(`/listings/${id}`, { include: "images,floorPlans,relatedStaffMembers,mainDescription,inspectionDates" }),
    { headers: headers(), next: { revalidate } }
  );
  if (!res.ok) throw new Error(`AgentBox error ${res.status}`);
  const data = await res.json();
  return data.response.listing as ABListing;
}

export async function fetchForSale(page = 1, limit = 20): Promise<ABListingsResponse> {
  return fetchListings({
    "filter[type]": "Sale",
    "filter[status]": "Available",
    "sort[listedDate]": "desc",
    page: String(page),
    limit: String(limit),
  });
}

export async function fetchForLease(page = 1, limit = 20): Promise<ABListingsResponse> {
  return fetchListings({
    "filter[type]": "Lease",
    "filter[status]": "Available",
    "sort[listedDate]": "desc",
    page: String(page),
    limit: String(limit),
  });
}

export async function fetchCommercialSale(page = 1, limit = 200): Promise<ABListingsResponse> {
  // Commercial sales in AgentBox are type=Sale with property.type=Commercial
  return fetchListings({
    "filter[type]": "Sale",
    "filter[status]": "Available",
    "sort[listedDate]": "desc",
    page: String(page),
    limit: String(limit),
  });
}

export async function fetchCommercialLease(page = 1, limit = 200): Promise<ABListingsResponse> {
  // Commercial leases in AgentBox are type=Lease with property.type=Commercial
  return fetchListings({
    "filter[type]": "Lease",
    "filter[status]": "Available",
    "sort[listedDate]": "desc",
    page: String(page),
    limit: String(limit),
  });
}

export async function fetchBusiness(page = 1, limit = 200): Promise<ABListingsResponse> {
  // Business listings in AgentBox are type=Sale, property.type=Business, status=Available
  return fetchListings({
    "filter[type]": "Sale",
    "filter[status]": "Available",
    "sort[listedDate]": "desc",
    page: String(page),
    limit: String(limit),
  });
}

export async function fetchSold(page = 1, limit = 500): Promise<ABListingsResponse> {
  // Sold properties in AgentBox use status=Settled (not "Sold")
  return fetchListings({
    "filter[type]": "Sale",
    "filter[status]": "Settled",
    "sort[listedDate]": "desc",
    page: String(page),
    limit: String(limit),
  });
}

// ─── Enquiry submission ───────────────────────────────────────────────────────

export interface EnquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  listingId?: string;
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<boolean> {
  const body: Record<string, unknown> = {
    comment: payload.message,
    source: "Website",
    attachedContact: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      mobile: payload.phone,
      contactClasses: [{ name: "Prospective Buyer" }],
      actions: {
        attachListingAgents: true,
        addDefaultContactClasses: true,
        addDefaultSubscriptions: false,
        addDefaultRequirements: false,
      },
    },
  };

  if (payload.listingId) {
    body.attachedListing = { id: payload.listingId };
  }

  const res = await fetch(url("/enquiries"), {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ enquiry: body }),
  });

  return res.ok;
}

// ─── Map AgentBox listing → our Property type ────────────────────────────────

import type { Property } from "@/lib/types";

function formatInspectionTime(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const day = s.toLocaleDateString("en-AU", { weekday: "short", timeZone: "Australia/Sydney" });
  const date = s.toLocaleDateString("en-AU", { day: "numeric", month: "short", timeZone: "Australia/Sydney" });
  const fmt = (d: Date) => {
    const h = d.toLocaleString("en-AU", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Australia/Sydney" });
    return h.replace(" am", "am").replace(" pm", "pm").replace(":00", "");
  };
  return `${day} ${date}, ${fmt(s)}–${fmt(e)}`;
}

function nextInspection(dates?: ABListing["inspectionDates"]): string | undefined {
  if (!dates?.length) return undefined;
  const now = Date.now();
  const upcoming = dates
    .filter((d) => new Date(d.startDate).getTime() > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  if (!upcoming.length) return undefined;
  return formatInspectionTime(upcoming[0].startDate, upcoming[0].endDate);
}

export function mapListing(l: ABListing): Property {
  const addr = l.property.address;
  const unit = addr.unitNum ? `${addr.unitNum}/` : "";
  const address = `${unit}${addr.streetNum ? addr.streetNum + " " : ""}${addr.streetName}${addr.streetType ? " " + addr.streetType : ""}`.trim()
    || addr.streetAddress;

  const landVal = l.property.landArea?.value;
  const landUnit = l.property.landArea?.unit || "m²";
  const landSize = landVal && landVal !== "0" ? `${landVal}${landUnit}` : undefined;

  const buildVal = l.property.buildingArea?.value;
  const buildUnit = l.property.buildingArea?.unit || "m²";
  const buildingSize = buildVal && buildVal !== "0" ? `${buildVal}${buildUnit}` : undefined;

  // Derive the correct property type using both listing type and property.type
  function resolveType(): Property["type"] {
    const propType = l.property.type; // "Residential" | "Commercial" | "Business" | "Rural"
    if (propType === "Commercial") {
      return l.type === "Lease" ? "commercial-lease" : "commercial-sale";
    }
    if (propType === "Business") return "business";
    if (l.type === "Lease") return "residential-rent";
    return "residential-sale";
  }

  return {
    id: l.id,
    type: resolveType(),
    title: l.mainHeadline || address,
    address,
    suburb: addr.suburb,
    price: (() => {
      // Manual price overrides — set to "Contact Agent" regardless of CRM value
      const contactAgentIds = ["1P1952"];
      if (contactAgentIds.includes(l.id)) return "Contact Agent";

      const isSold = ["Settled", "Sold", "Unconditional"].includes(l.status);
      if (isSold) {
        const hiddenInAgentBox = l.soldPriceHide || l.soldPriceUndisclosed || (l.displaySoldPrice === false);
        const manualOverride = ["1P2061"].includes(l.id);
        if (manualOverride || hiddenInAgentBox || !l.soldPrice) return "Contact Agent";
        return "$" + new Intl.NumberFormat("en-AU").format(l.soldPrice);
      }
      return l.displayPrice || "Contact Agent";
    })(),
    beds: l.property.bedrooms ? parseInt(l.property.bedrooms) : undefined,
    baths: l.property.bathrooms ? parseInt(l.property.bathrooms) : undefined,
    cars: l.property.totalParking ? parseInt(l.property.totalParking) : undefined,
    landSize,
    buildingSize,
    description: l.description || l.mainHeadline || "",
    longDescription: l.mainDescription || l.description || l.mainHeadline || "",
    image: l.mainImage?.url ?? l.images?.[0]?.url ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    photos: l.images?.map((i) => i.url),
    floorPlan: l.floorPlans?.[0]?.url,
    tag: listingTag(l),
    featured: l.status === "Available",
    agent: l.staff?.[0] ? `${l.staff[0].firstName} ${l.staff[0].lastName}`.trim() : undefined,
    openHome: nextInspection(l.inspectionDates) || l.openHome || undefined,
  };
}

// ─── Display helpers ──────────────────────────────────────────────────────────

export function listingAddress(l: ABListing): string {
  const a = l.property.address;
  const unit = a.unitNum ? `${a.unitNum}/` : "";
  return `${unit}${a.streetAddress}`;
}

export function listingImage(l: ABListing): string {
  return l.images?.[0]?.url ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80";
}

export function listingTag(l: ABListing): string | undefined {
  if (l.status === "Under Offer") return "Under Offer";
  if (l.status === "Sold" || l.status === "Settled" || l.status === "Unconditional") return "Sold";
  if (l.status === "Leased") return "Leased";
  if (l.auctionDate) return "Auction";
  if (l.method === "Auction") return "Auction";
  const listedMs = l.listedDate ? new Date(l.listedDate).getTime() : 0;
  const ageMs = Date.now() - listedMs;
  if (ageMs <= 7 * 24 * 60 * 60 * 1000) return "New Listing";
  return undefined;
}
