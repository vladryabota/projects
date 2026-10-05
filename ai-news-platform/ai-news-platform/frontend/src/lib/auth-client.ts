import {
  CLIENT_API_URL,
  INTERNAL_API_URL,
} from "./api-config";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

type AuthResponse = {
  user: AuthUser;
};

async function parseErrorMessage(response: Response): Promise<string> {
  const data = (await response.json().catch(() => null)) as {
    message?: string | string[];
  } | null;

  if (Array.isArray(data?.message)) {
    return data.message.join(", ");
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  return "Request failed";
}

export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  const response = await fetch(`${CLIENT_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  const data = (await response.json()) as AuthResponse;
  return data.user;
}

export async function logout(): Promise<void> {
  await fetch(`${CLIENT_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function refreshSession(): Promise<boolean> {
  const response = await fetch(`${CLIENT_API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return response.ok;
}

export async function apiClientFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers);

  let response = await fetch(`${CLIENT_API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  if (response.status === 401 && !path.startsWith("/auth/")) {
    const refreshed = await refreshSession();

    if (refreshed) {
      response = await fetch(`${CLIENT_API_URL}${path}`, {
        ...options,
        credentials: "include",
        headers,
      });
    }
  }

  return response;
}

export async function refreshSessionOnServer(
  cookieHeader: string,
): Promise<string | null> {
  const response = await fetch(`${INTERNAL_API_URL}/auth/refresh`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    return null;
  }

  const setCookies =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : [];

  if (setCookies.length === 0) {
    return cookieHeader;
  }

  return setCookies.map((cookie) => cookie.split(";")[0]).join("; ");
}
