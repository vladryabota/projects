import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import { SourceActions } from "./sourceActions";
import { CreateSourceForm } from "./createSourceForm";
import { FetchAllSourcesButton } from "./fetchAllSources";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardAction, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

type Source = {
    id: string;
    name: string;
    url: string;
    type: string;
    category: string;
    active: boolean;
    lastFetchedAt: string | null;
    lastFetchStatus: string | null;
    lastFetchError: string | null;
};

export default async function SourcesPage() {
    const sources = await apiFetch<Source[]>("/sources");

    return (
        <main className="min-h-screen bg-gray-50 px-8 py-10">
            <nav className="mb-8 flex items-center gap-3 text-sm text-gray-600">
                <Link href="/" className="hover:text-black">
                    Home
                </Link>
                <span>/</span>
                <span className="font-medium text-black">Sources</span>
            </nav>

            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sources</h1>
                    <p className="mt-2 text-gray-600">
                        RSS/API sources used to import articles.
                    </p>
                </div>

                <Link
                    href="/articles"
                    className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                    View articles
                </Link>
            </div>
            <CreateSourceForm />
            <div className="m-4">
                <FetchAllSourcesButton />
            </div>

            <div className="grid gap-4">
                {sources.map((source) => (
                    <Card key={source.id} className="shadow-sm">
                        <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <CardTitle>{source.name}</CardTitle>

                                    <CardDescription className="mt-1">
                                        <a
                                            href={source.url}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {source.url}
                                        </a>
                                    </CardDescription>
                                </div>

                                <Badge variant={source.active ? "default" : "destructive"}>
                                    {source.active ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2 lg:grid-cols-4">
                                <div>
                                    <p className="text-gray-500">Type</p>
                                    <p className="font-medium">{source.type}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Category</p>
                                    <p className="font-medium">{source.category}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Last fetch</p>
                                    <p className="font-medium">
                                        {source.lastFetchedAt
                                            ? new Date(source.lastFetchedAt).toLocaleString()
                                            : "Never"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Fetch status</p>
                                    <p className="font-medium">
                                        {source.lastFetchStatus ?? "Unknown"}
                                    </p>
                                </div>
                            </div>

                            {source.lastFetchError && (
                                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                    {source.lastFetchError}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter>
                            <SourceActions sourceId={source.id} active={source.active} />
                        </CardFooter>
                    </Card>

                ))}
            </div>
        </main >
    );
}