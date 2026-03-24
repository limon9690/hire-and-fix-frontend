import { getApiBaseUrl } from "@/lib/config";
import {
  ApiError,
  type ApiFailureResponse,
  type ApiResponse,
  type ApiSuccessResponse,
} from "./types";

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  query?: QueryParams;
  body?: BodyInit | Record<string, unknown> | null;
};

const buildUrl = (path: string, query?: QueryParams) => {
  const sanitizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${getApiBaseUrl()}${sanitizedPath}`);

  if (!query) {
    return url.toString();
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined || value === "") {
      continue;
    }
    url.searchParams.set(key, String(value));
  }

  return url.toString();
};

const isJsonObject = (value: unknown): value is Record<string, unknown> => {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

export const apiFetch = async <T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> => {
  const { query, body, headers, ...restOptions } = options;
  const requestHeaders = new Headers(headers);
  let requestBody: BodyInit | null | undefined = body as BodyInit | null;

  if (isJsonObject(body)) {
    requestHeaders.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path, query), {
    credentials: "include",
    ...restOptions,
    headers: requestHeaders,
    body: requestBody,
  });

  const parsedBody = await parseResponseBody(response);

  if (!response.ok) {
    if (isJsonObject(parsedBody)) {
      const errorPayload = parsedBody as ApiFailureResponse;
      throw new ApiError(
        errorPayload.message || "Request failed",
        errorPayload.statusCode ?? response.status,
        errorPayload.errorSources ?? []
      );
    }

    throw new ApiError("Request failed", response.status);
  }

  if (isJsonObject(parsedBody) && "success" in parsedBody) {
    const payload = parsedBody as ApiResponse<T>;
    if (!payload.success) {
      throw new ApiError(
        payload.message,
        payload.statusCode ?? response.status,
        payload.errorSources ?? []
      );
    }
    return payload.data;
  }

  return parsedBody as T;
};

export const apiFetchWithMeta = async <T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<ApiSuccessResponse<T>> => {
  const { query, body, headers, ...restOptions } = options;
  const requestHeaders = new Headers(headers);
  let requestBody: BodyInit | null | undefined = body as BodyInit | null;

  if (isJsonObject(body)) {
    requestHeaders.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path, query), {
    credentials: "include",
    ...restOptions,
    headers: requestHeaders,
    body: requestBody,
  });

  const parsedBody = await parseResponseBody(response);

  if (!response.ok) {
    if (isJsonObject(parsedBody)) {
      const errorPayload = parsedBody as ApiFailureResponse;
      throw new ApiError(
        errorPayload.message || "Request failed",
        errorPayload.statusCode ?? response.status,
        errorPayload.errorSources ?? []
      );
    }

    throw new ApiError("Request failed", response.status);
  }

  if (!isJsonObject(parsedBody) || !("success" in parsedBody)) {
    throw new ApiError("Unexpected response format", response.status);
  }

  const payload = parsedBody as ApiResponse<T>;
  if (!payload.success) {
    throw new ApiError(
      payload.message,
      payload.statusCode ?? response.status,
      payload.errorSources ?? []
    );
  }

  return payload;
};
