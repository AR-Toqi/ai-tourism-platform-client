export const ROUTES = {
  // Public
  HOME: "/",
  DESTINATIONS: "/destinations",
  DESTINATION_DETAIL: (slug: string) => `/destinations/${slug}`,

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",

  // Protected - User
  PROFILE: "/profile",
  ITINERARIES: "/itineraries",
  CREATE_ITINERARY: "/itineraries/create",
  ITINERARY_DETAIL: (id: string) => `/itineraries/${id}`,
  AI_CHAT: "/ai-chat",
  CHAT_DETAIL: (chatId: string) => `/ai-chat/${chatId}`,
  SAVED: "/saved",

  // Admin
  ADMIN_DASHBOARD: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_ITINERARIES: "/admin/itineraries",
  ADMIN_PROFILE: "/admin/profile",

  // Content Manager
  CM_DASHBOARD: "/content-manager",
  CM_DESTINATIONS: "/content-manager/destinations",
  CM_DESTINATION_EDIT: (id: string) => `/content-manager/destinations/${id}`,
  CM_DESTINATION_COVER: (id: string) =>
    `/content-manager/destinations/${id}/cover`,
  CM_DESTINATION_GALLERY: (id: string) =>
    `/content-manager/destinations/${id}/gallery`,
  CM_PROFILE: "/content-manager/profile",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.DESTINATIONS,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VERIFY_EMAIL,
];

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VERIFY_EMAIL,
];
