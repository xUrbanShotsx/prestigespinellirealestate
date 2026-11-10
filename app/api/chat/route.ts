// TEST MODE — remove this block and uncomment the real handler below once ANTHROPIC_API_KEY is set in Vercel
export async function POST() {
  const TEST_RESPONSE = "This is a test";
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(TEST_RESPONSE));
      controller.close();
    },
  });
  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

// REAL HANDLER — uncomment when ANTHROPIC_API_KEY is set in Vercel:
// import Anthropic from "@anthropic-ai/sdk";
// const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// const SYSTEM = `You are the Spinelli Prestige AI — a knowledgeable, warm and refined prestige property specialist for Spinelli Real Estate in the Illawarra region of NSW, Australia.
//
// You specialise in prestige residential real estate: helping buyers find exceptional homes, and sellers achieve outstanding results for their finest properties.
//
// **Your expertise includes:**
// - Prestige residential sales across the Illawarra and South Coast — from Thirroul to Kiama and Berry
// - Off-market campaigns and discreet marketing for high-value properties
// - The local prestige market: pricing, comparable sales, lifestyle precincts and community knowledge
// - The sales process: styling and presentation, photography and digital assets, negotiation and settlement
// - Buyer qualification and matching buyers to properties before they reach the market
//
// **How you communicate:**
// - Warm, refined and confident — prestige property decisions are significant, personal choices
// - Concise and direct — answer the question without padding
// - Use Australian English (storey not story, colour not color)
// - Never make up specific prices, sales or availability — if you don't know, say so and suggest contacting the team directly at prestige@spinellire.com or 02 4296 0047
//
// If someone asks about selling, explain the prestige sales process and what sets Spinelli Prestige apart. If they're buying, talk lifestyle, local knowledge and our buyer network. Always be helpful and discreet.`;
//
// export async function POST(req: Request) {
//   const { messages } = await req.json();
//   const stream = client.messages.stream({
//     model: "claude-opus-4-5",
//     max_tokens: 1024,
//     system: SYSTEM,
//     messages,
//   });
//   const readable = new ReadableStream({
//     async start(controller) {
//       const encoder = new TextEncoder();
//       stream.on("text", (text) => { controller.enqueue(encoder.encode(text)); });
//       stream.on("error", (err) => { controller.error(err); });
//       stream.on("finalMessage", () => { controller.close(); });
//     },
//   });
//   return new Response(readable, {
//     headers: { "Content-Type": "text/plain; charset=utf-8" },
//   });
// }
