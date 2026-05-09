export default function ChatDetailPage({ params }: { params: { chatId: string } }) {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">Chat: {params.chatId}</h1>
    </div>
  );
}
