import { notFound } from "next/navigation";
import { EVENTS } from "@/lib/data";
import { EventDetail } from "@/features/events/event-detail";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.shortDescription,
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
