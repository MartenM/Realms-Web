import { ApiException } from '$lib/api/ApiClient';

export function extractApiErrorMessage(error: unknown, fallback: string): string {
    if (ApiException.isApiException(error)) {
        try {
            const parsed = JSON.parse((error as ApiException).response);
            if (parsed?.message) {
                return parsed.message;
            }
        } catch {
            // response wasn't JSON, fall through to fallback
        }
    }
    return fallback;
}
