export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Itinerary: {params.id}</h1>
    </div>
  );
}
