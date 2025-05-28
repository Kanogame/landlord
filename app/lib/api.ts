export async function Post<T>(path: string, requestObject: {}): Promise<T> {
  const resp = await req('POST', path, requestObject, undefined);
  console.log(resp);
  return resp;
}

export async function Get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const resp = await req('GET', path, undefined, signal);
  console.log(resp);
  return resp;
}

async function req(
  method: string,
  url: string,
  requestObject?: {},
  signal?: AbortSignal | undefined
) {
  const body = requestObject ?? null;
  try {
    const resp = await doFetch(
      `${import.meta.env.VITE_BACKEND_ENDPOINT}${url}`,
      method,
      body,
      getAuthToken(),
      signal
    );
    return await resp.json();
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
