"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiClientFetch } from "@/src/lib/auth-client";

export function FetchAllSourcesButton() {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    async function fetchAllSources() {
        setIsFetching(true);
        setMessage(null);

        try {
            const response = await apiClientFetch("/sources/fetch-all", {
                method: "POST",
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                setMessage(data?.message ?? "Failed to fetch all sources");
                return;
            }

            setMessage(
                `Fetched ${data.totalSources} source(s).`,
            );

            router.refresh();
        } finally {
            setIsFetching(false);
        }
    }

    return (
        <div className="flex flex-col items-end gap-2">
            <Button
                type="button"
                variant="outline"
                onClick={fetchAllSources}
                disabled={isFetching}
            //className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
                {isFetching ? "Fetching..." : "Fetch all active sources"}
            </Button>

            {message && (
                <p className="text-sm text-gray-600">{message}</p>
            )}
        </div>
    );
}