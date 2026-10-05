"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { apiClientFetch } from "@/src/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";


const createArticleSummarySchema = z.object({
    summary: z.string().min(1, "Summary is required"),
});

type ArticleSummaryFormValues = z.infer<typeof createArticleSummarySchema>;

type Props = {
    articleId: string;
    initialSummary?: string;
};

export function ArticleSummaryForm({ articleId, initialSummary }: Props) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const form = useForm<ArticleSummaryFormValues>({
        resolver: zodResolver(createArticleSummarySchema),
        defaultValues: {
            summary: initialSummary || "",
        },
    });

    async function generateSummary() {
        setIsGenerating(true);

        try {
            const response = await apiClientFetch(
                `/articles/${articleId}/generate-summary`,
                {
                    method: "PATCH",
                },
            );

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                toast.error(
                    Array.isArray(data?.message)
                        ? data.message.join(", ")
                        : data?.message ?? "Failed to generate summary",
                );
                return;
            }

            form.setValue("summary", data.summary);
            toast.success("Summary generated");
        } finally {
            setIsGenerating(false);
        }
    }

    async function onSubmit(values: ArticleSummaryFormValues) {
        setIsSaving(true);

        try {
            const response = await apiClientFetch(`/articles/${articleId}/summary`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ summary: values.summary }),
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                toast.error(
                    Array.isArray(data?.message)
                        ? data.message.join(", ")
                        : data?.message ?? "Failed to save summary",
                );
                return;
            }
            toast.success("Summary saved");
            router.refresh();
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Article summary</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label className="mb-5" htmlFor="summary">
                            Summary
                        </Label>

                        <Textarea
                            id="summary"
                            placeholder="Write a short summary..."
                            rows={6}
                            {...form.register("summary")}
                        />

                        {form.formState.errors.summary && (
                            <p className="mt-1 text-sm text-red-600">
                                {form.formState.errors.summary.message}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="secondary"
                            disabled={isGenerating}
                            onClick={generateSummary}
                        >
                            {isGenerating ? "Generating..." : "Generate AI Summary"}
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save Summary"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}