"use client";

import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/src/lib/auth-client";
import { Button } from "@/components/ui/button";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") {
    return null;
  }

  async function handleLogout() {
    await logout();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex justify-end px-8 pt-6">
      <Button type="button" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
