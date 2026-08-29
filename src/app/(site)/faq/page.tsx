import type { Metadata } from "next";
import { FAQContent } from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Eco Marina consulting services, process, pricing, and environmental compliance.",
};

export default function FAQPage() {
  return <FAQContent />;
}
