import { Client } from './ApiClient';
import { PUBLIC_API_URL } from '$env/static/public';

export type ApiFetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export interface ApiClientOptions {
  baseUrl?: string;
  fetch?: ApiFetch;
  credentials?: RequestCredentials;
}

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? PUBLIC_API_URL;
  const fetcher = options.fetch ?? fetch;
  const credentials = options.credentials ?? 'include';

  return new Client(baseUrl, {
    fetch: (url, init) => {
      return fetcher(url, {
        credentials: init?.credentials ?? credentials,
        ...init,
      });
    },
  });
}

export function createApiFetch(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? PUBLIC_API_URL;
  const fetcher = options.fetch ?? fetch;
  const credentials = options.credentials ?? 'include';

  return (input: RequestInfo, init?: RequestInit) => {
    const url = typeof input === 'string' && !/^https?:\/\//i.test(input)
      ? `${baseUrl}${input}`
      : input;

    return fetcher(url, {
      credentials: init?.credentials ?? credentials,
      ...init,
    });
  };
}
