import { DestinationDetailView } from "@/components/destinations/destination-detail-view";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <DestinationDetailView slug={slug} />
    </div>
  );
}

