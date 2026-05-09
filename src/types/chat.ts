export interface IChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  chatId: string;
  createdAt: string;
}

export interface IChat {
  id: string;
  title: string;
  userId: string;
  messages: IChatMessage[];
  createdAt: string;
  updatedAt: string;
}
