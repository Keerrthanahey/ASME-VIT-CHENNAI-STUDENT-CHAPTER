import { notFound } from "next/navigation";
import { WORKSHOPS } from "@/lib/data";
import { WorkshopDetail } from "@/features/workshops/workshop-detail";

interface WorkshopPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }));
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const { slug } = await params;
  const workshop = WORKSHOPS.find((w) => w.slug === slug);
  if (!workshop) notFound();
  return <WorkshopDetail workshop={workshop} />;
}
