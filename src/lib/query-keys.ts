export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  destinations: {
    all: ["destinations"] as const,
    list: (filters: Record<string, unknown>) =>
      ["destinations", "list", filters] as const,
    detail: (slug: string) => ["destinations", slug] as const,
    featured: ["destinations", "featured"] as const,
  },
  reviews: {
    byDestination: (destinationId: string) =>
      ["reviews", destinationId] as const,
  },
  itineraries: {
    all: ["itineraries"] as const,
    my: ["itineraries", "my"] as const,
    detail: (id: string) => ["itineraries", id] as const,
  },
  chat: {
    all: ["chats"] as const,
    my: ["chats", "my"] as const,
    messages: (chatId: string) => ["chats", chatId, "messages"] as const,
  },
  saved: {
    all: ["saved"] as const,
  },
  admin: {
    stats: ["admin", "stats"] as const,
    users: (type: string) => ["admin", "users", type] as const,
    itineraries: ["admin", "itineraries"] as const,
  },
  contentManager: {
    destinations: ["cm", "destinations"] as const,
    destination: (id: string) => ["cm", "destinations", id] as const,
  },
} as const;
