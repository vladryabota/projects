import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { INTERNAL_API_URL } from "./api-config";
import { refreshSessionOnServer } from "./auth-client";

export async function apiFetch<T>(path: string): Promise<T> {
  const cookieStore = await cookies();
  let cookieHeader = cookieStore.toString();

  let response = await fetch(`${INTERNAL_API_URL}${path}`, {
    cache: "no-store",
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });

  if (response.status === 401 && cookieHeader) {
    const refreshedCookieHeader = await refreshSessionOnServer(cookieHeader);

    if (!refreshedCookieHeader) {
      redirect("/login");
    }

    cookieHeader = refreshedCookieHeader;

    response = await fetch(`${INTERNAL_API_URL}${path}`, {
      cache: "no-store",
      headers: { Cookie: cookieHeader },
    });
  }

  if (response.status === 401) {
    redirect("/login");
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");

    throw new Error(`API ${response.status} for ${path}\n${body}`);
  }

  return response.json() as Promise<T>;
}
