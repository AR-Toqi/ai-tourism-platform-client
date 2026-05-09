export default function ContentManagerGalleryPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">CM: Destination Gallery {params.id}</h1>
    </div>
  );
}
