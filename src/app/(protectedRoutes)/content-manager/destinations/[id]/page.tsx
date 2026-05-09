export default function ContentManagerEditDestinationPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">CM: Edit Destination {params.id}</h1>
    </div>
  );
}
