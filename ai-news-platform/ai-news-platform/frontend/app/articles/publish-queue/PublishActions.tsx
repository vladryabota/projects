"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiClientFetch } from "@/src/lib/auth-client";

type Props = {
    articleId: string;
};

export function PublishActions({ articleId }: Props) {
    const router = useRouter();

    async function markAsPublished() {
        const response = await apiClientFetch(`/articles/${articleId}/published`, {
            method: "PATCH",
        });

        if (!response.ok) {
            alert("Failed to mark article as published");
            return;
        }

        router.refresh();
    }

    return (
        <div className="mt-4">
            <Button
                type="button"
                variant="outline"
                onClick={markAsPublished}
            //className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
                Mark as published
            </Button>
        </div>
    );
}