import { browser } from '$app/environment';
import { Client } from './ApiClient';
import { PUBLIC_API_URL } from '$env/static/public';
import { ensureAuthToken } from '$lib/stores/profileStore';

export type ApiFetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface ApiClientOptions {
  baseUrl?: string;
  fetch?: ApiFetch;
  credentials?: RequestCredentials;
}

function resolveUrl(input: RequestInfo, baseUrl: string): RequestInfo {
  if (typeof input === 'string' && !/^https?:\/\//i.test(input)) {
    return `${baseUrl}${input}`;
  }
  return input;
}

function getRequestUrl(input: RequestInfo, baseUrl: string): string {
  if (typeof input === 'string') {
    return !/^https?:\/\//i.test(input) ? `${baseUrl}${input}` : input;
  }
  return input.url;
}

function isAuthEndpoint(url: string, baseUrl: string) {
  return url.endsWith('/api/auth') || url.endsWith('/api/auth/refresh') || url === `${baseUrl}/api/auth` || url === `${baseUrl}/api/auth/refresh`;
}

async function buildAuthenticatedFetch(
  input: RequestInfo,
  init: RequestInit | undefined,
  baseUrl: string,
  fetcher: ApiFetch,
  credentials: RequestCredentials,
) {
  const requestUrl = getRequestUrl(input, baseUrl);
  const target = resolveUrl(input, baseUrl);
  const headers = new Headers(init?.headers);

  const shouldAttachAuth = browser && !isAuthEndpoint(requestUrl, baseUrl);
  if (shouldAttachAuth) {
    const token = await ensureAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const combinedInit: RequestInit = {
    credentials: init?.credentials ?? credentials,
    ...init,
    headers,
  };

  let response = await fetcher(target, combinedInit);

  if (shouldAttachAuth && response.status === 401) {
    const token = await ensureAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      response = await fetcher(target, {
        credentials: init?.credentials ?? credentials,
        ...init,
        headers,
      });
    }
  }

  return response;
}

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? PUBLIC_API_URL;
  const fetcher = options.fetch ?? fetch;
  const credentials = options.credentials ?? 'include';

  return new Client(baseUrl, {
    fetch: (url, init) => buildAuthenticatedFetch(url, init, baseUrl, fetcher, credentials),
  });
}

export function createApiFetch(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? PUBLIC_API_URL;
  const fetcher = options.fetch ?? fetch;
  const credentials = options.credentials ?? 'include';

  return (input: RequestInfo, init?: RequestInit) => {
    return buildAuthenticatedFetch(input, init, baseUrl, fetcher, credentials);
  };
}
