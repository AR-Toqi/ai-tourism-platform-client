export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Destination: {params.slug}</h1>
    </div>
  );
}
