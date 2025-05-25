export async function Post<T>(path: string, requestObject: {}): Promise<T> {
  console.log(import.meta.env.VITE_BACKEND_ENDPOINT + path);
  const resp = await req('POST', path, requestObject, undefined);
  if (!resp.ok) {
    console.log('error, ' + resp);
  }
  return resp as T;
}

async function req(
  method: string,
  url: string,
  requestObject?: {},
  signal?: AbortSignal | undefined
) {
  const body = requestObject ?? null;
  const resp = await doFetch(
    `${import.meta.env.VITE_BACKEND_ENDPOINT}${url}`,
    method,
    body,
    null,
    signal
  );
  console.log(resp, JSON.stringify(body));
  return await resp.json();
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
