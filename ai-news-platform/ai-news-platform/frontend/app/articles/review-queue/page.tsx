import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import { ReviewActions } from "@/app/articles/review/ReviewActions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Article = {
    id: string;
    title: string;
    url: string;
    sourceId: string;
    category: string;
    status: string;
    publishedAt: string | null;
    createdAt: string;
    source?: {
        id: string;
        name: string;
    };
};

export default async function ArticlesReviewPage() {

    const articles = await apiFetch<Article[]>(
        `/articles/review-queue`,
    );
    return (
        <main className="min-h-screen bg-gray-50 px-8 py-10">
            <nav className="mb-8 flex items-center gap-3 text-sm text-gray-600">
                <Link href="/" className="hover:text-black">
                    Home
                </Link>
                <span>/</span>
                <span className="font-medium text-black">Articles</span>
            </nav>

            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
                    <p className="mt-2 text-gray-600">
                        Manage imported articles, review status, and publishing state.
                    </p>
                </div>

                <Link
                    href="/sources"
                    className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                    View sources
                </Link>
            </div>

            <div className="grid gap-4">
                {articles.map((article) => (
                    <Card key={article.id} className="shadow-sm">
                        <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <CardTitle>
                                        <Link
                                            href={`/articles/${article.id}`}
                                            className="hover:underline"
                                        >
                                            {article.title}
                                        </Link>
                                    </CardTitle>

                                    <CardDescription className="mt-1">
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Open original article
                                        </a>
                                    </CardDescription>
                                </div>

                                <Badge variant={article.status === "PUBLISHED" ? "default" : "secondary"}>
                                    {article.status}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2 lg:grid-cols-4">
                                <div>
                                    <p className="text-gray-500">Category</p>
                                    <p className="font-medium">{article.category}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Source</p>
                                    <p className="font-medium">
                                        {article.source?.name ?? article.sourceId}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Created</p>
                                    <p className="font-medium">
                                        {new Date(article.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Published</p>
                                    <p className="font-medium">
                                        {article.publishedAt
                                            ? new Date(article.publishedAt).toLocaleString()
                                            : "Not published"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

            </div>
        </main>
    );
}