const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1` || "http://localhost:5000/api/v1";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function refreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchWithAuth<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const config: RequestInit = {
    ...fetchOptions,
    credentials: "include",
    headers: {
      ...(!(fetchOptions.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
      ...fetchOptions.headers,
    },
  };

  let res = await fetch(url, config);

  // Auto token refresh on 401
  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      res = await fetch(url, config);
    }
  }

  const data = await res.json();

  if (!res.ok) {
    throw new ApiError(
      data?.message || "Something went wrong",
      res.status,
      data
    );
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    fetchWithAuth<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    fetchWithAuth<T>(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    fetchWithAuth<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: unknown, options?: FetchOptions) =>
    fetchWithAuth<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    fetchWithAuth<T>(endpoint, { ...options, method: "DELETE" }),
};

export { ApiError };
