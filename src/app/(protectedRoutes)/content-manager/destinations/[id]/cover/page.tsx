export default function ContentManagerCoverPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">CM: Destination Cover Image {params.id}</h1>
    </div>
  );
}
