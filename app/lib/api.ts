import { toast } from 'sonner';
import { showLoginModal } from '~/lib/loginModal';

export async function Post<T>(path: string, requestObject: {}): Promise<T> {
  try {
    const resp = await req('POST', path, requestObject, undefined);
    return resp;
  } catch (e) {
    return { success: false } as T;
  }
}

export function ErrorToast(msg: string) {
  toast.error(msg);
}

export async function Get<T>(path: string, signal?: AbortSignal): Promise<T> {
  try {
    const resp = await req('GET', path, undefined, signal);
    return resp;
  } catch (e) {
    return { success: false } as T;
  }
}

async function req(
  method: string,
  url: string,
  requestObject?: {},
  signal?: AbortSignal | undefined
) {
  const body = requestObject ?? null;
  try {
    const response = await doFetch(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}${url}`,
      method,
      body,
      getAuthToken(),
      signal
    );

    if (response.status === 401) {
      showLoginModal();
    }

    return await response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function doFetch(
  url: string,
  method: string,
  body: null | {},
  token: null | string,
  signal?: AbortSignal | undefined
): Promise<Response> {
  const options = makeOptions(method, body, token, signal);
  return await fetch(url, options);
}

function makeOptions(
  method: string,
  body: null | {},
  token: null | string,
  signal?: AbortSignal | undefined
): RequestInit {
  const headers: HeadersInit = {};
  if (body !== null) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  let options: RequestInit = {
    method: method,
    cache: 'no-cache',
    headers: headers,
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  if (signal) {
    options.signal = signal;
  }
  return options;
}

function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('auth_token');
    return stored ? JSON.parse(stored) : null;
  }
  return null;
}
