"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiClientFetch } from "@/src/lib/auth-client";

type Props = {
    articleId: string;
};

export function ReviewActions({ articleId }: Props) {
    const router = useRouter();

    async function updateStatus(status: "APPROVED" | "REJECTED") {
        const response = await apiClientFetch(`/articles/${articleId}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            alert("Failed to update article status");
            return;
        }

        router.refresh();
    }

    return (
        <div className="mt-4 flex gap-2">
            <Button
                type="button"
                variant="outline"
                onClick={() => updateStatus("APPROVED")}
            //className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
                Approve
            </Button>

            <Button
                type="button"
                variant="outline"
                onClick={() => updateStatus("REJECTED")}
            //className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
                Reject
            </Button>
        </div>
    );
}