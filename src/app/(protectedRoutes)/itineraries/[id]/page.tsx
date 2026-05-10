import { ItineraryView } from "@/components/itinerary/itinerary-view";


export default async function ItineraryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="container py-10">
      <ItineraryView id={id} />
    </div>
  );
}
