const fallbackApiBaseUrl = "http://localhost:5000/api/v1";

export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? fallbackApiBaseUrl,
} as const;

export const getApiBaseUrl = () => config.apiBaseUrl.replace(/\/+$/, "");
