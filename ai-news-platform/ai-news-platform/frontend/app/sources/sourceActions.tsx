"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiClientFetch } from "@/src/lib/auth-client";

type Props = {
    sourceId: string;
    active: boolean;
};

export function SourceActions({ sourceId, active }: Props) {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    async function toggleActive() {
        setIsToggling(true);
        try {
            const response = await apiClientFetch(`/sources/${sourceId}/active`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    active: !active,
                }),
            });

            if (!response.ok) {
                alert("Failed to update source active status");
                return;
            }

            router.refresh();
        } finally {
            setIsToggling(false);
        }
    }

    async function fetchSource() {
        setIsFetching(true);
        try {
            const response = await apiClientFetch(`/sources/${sourceId}/fetch`, {
                method: "POST",
            });

            if (!response.ok) {
                alert("Failed to fetch source");
                return;
            }

            router.refresh();
        } finally {
            setIsFetching(false);
        }
    }

    return (
        <div className="mt-4 flex gap-2">
            <Button
                type='button'
                variant='outline'
                onClick={toggleActive}
                disabled={isToggling}
            //className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
                {isToggling ? "Toggling..." : active ? "Deactivate" : "Activate"}
            </Button>
            <Button
                type='button'
                variant='outline'
                onClick={fetchSource}
                disabled={isFetching}
            //className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
            >
                {isFetching ? "Fetching..." : "Fetch"}
            </Button>
        </div>
    );


}