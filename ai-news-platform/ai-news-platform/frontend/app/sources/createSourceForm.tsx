'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { apiClientFetch } from "@/src/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const createSourceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    url: z.string().url("Enter a valid URL"),
    type: z.enum(["RSS", "API", "SCRAPER"]),
    category: z.enum([
        "HEALTH",
        "SPACE",
        "POLITICS",
        "CRIME",
        "TECHNOLOGY",
        "SCIENCE",
        "EMERGENCY",
        "OTHER",
    ]),
});

type CreateSourceFormValues = z.infer<typeof createSourceSchema>;

export function CreateSourceForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CreateSourceFormValues>({
        resolver: zodResolver(createSourceSchema),
        defaultValues: {
            name: "",
            url: "",
            type: "RSS",
            category: "OTHER",
        },
    });

    async function onSubmit(values: CreateSourceFormValues) {
        setIsSubmitting(true);

        try {
            const response = await apiClientFetch("/sources", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                toast.error(
                    Array.isArray(data?.message)
                        ? data.message.join(", ")
                        : data?.message ?? "Failed to create source",
                );
                return;
            }

            toast.success("Source created");
            form.reset();
            router.refresh();
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Add source</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="NASA News"
                                {...form.register("name")}
                            />
                            {form.formState.errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                placeholder="https://www.nasa.gov/news-release/feed/"
                                {...form.register("url")}
                            />
                            {form.formState.errors.url && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.formState.errors.url.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="type">Type</Label>
                            <select
                                id="type"
                                {...form.register("type")}
                                className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                            >
                                <option value="RSS">RSS</option>
                                <option value="API">API</option>
                                <option value="SCRAPER">SCRAPER</option>
                            </select>
                            {form.formState.errors.type && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.formState.errors.type.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                {...form.register("category")}
                                className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
                            >
                                <option value="OTHER">OTHER</option>
                                <option value="SPACE">SPACE</option>
                                <option value="HEALTH">HEALTH</option>
                                <option value="POLITICS">POLITICS</option>
                                <option value="CRIME">CRIME</option>
                                <option value="TECHNOLOGY">TECHNOLOGY</option>
                                <option value="SCIENCE">SCIENCE</option>
                                <option value="EMERGENCY">EMERGENCY</option>
                            </select>
                            {form.formState.errors.category && (
                                <p className="mt-1 text-sm text-red-600">
                                    {form.formState.errors.category.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create source"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}