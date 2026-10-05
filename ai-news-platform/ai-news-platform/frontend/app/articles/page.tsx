import Link from "next/link";
import { apiFetch } from "@/src/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardDescription, CardAction, CardHeader, CardTitle } from "@/components/ui/card";

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

type ArticlesResponse = {
    data: Article[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export default async function ArticlesPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; limit?: string; search?: string; status?: string; category?: string }>;
}) {
    const params = await searchParams;
    const search = params.search ?? "";
    const status = params.status ?? "";
    const category = params.category ?? "";
    const page = Number(params.page ?? 1);
    const limit = Number(params.limit ?? 10);

    const query = new URLSearchParams();

    if (search && search !== '') query.set("search", search);
    if (status && status !== '') query.set("status", status);
    if (category && category !== '') query.set("category", category);

    query.set("page", String(page));
    query.set("limit", String(limit));

    const response = await apiFetch<ArticlesResponse>(`/articles?${query.toString()}`);


    const articles = response.data;

    const hasPreviousPage = page > 1;
    const hasNextPage = page < response.pagination.totalPages;
    return (
        <main className="min-h-screen bg-gray-50 px-8 py-10">
            <nav className="mb-8 flex items-center gap-3 text-sm text-gray-600">
                <Link href="/" className="hover:text-black">
                    Home
                </Link>
                <span>/</span>
                <span className="font-medium text-black">Articles</span>
            </nav>

            <form className="mb-6 grid gap-3 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-4">
                <input className="rounded-lg border px-3 py-2" type="text" name="search" placeholder="Search articles..." />
                <select name="status" className="rounded-lg border px-3 py-2">
                    <option value="">All statuses</option>
                    <option value="PENDING_REVIEW">Pending review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="PUBLISHED">Published</option>
                </select>

                <select name="category" className="rounded-lg border px-3 py-2">
                    <option value="">All categories</option>
                    <option value="SPACE">Space</option>
                    <option value="TECHNOLOGY">Technology</option>
                    <option value="SCIENCE">Science</option>
                    <option value="OTHER">Other</option>
                </select>
                <input type="hidden" name="page" value="1" />
                <input type="hidden" name="limit" value={limit} />

                <button className="rounded-lg bg-gray-900 px-4 py-2 text-white">
                    Apply
                </button>
            </form>

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

            <div className="mb-4 rounded-xl border bg-white p-4 text-sm text-gray-700 shadow-sm">
                <p>
                    Showing page {response.pagination.page} of{" "}
                    {response.pagination.totalPages}
                </p>
                <p>Total articles: {response.pagination.total}</p>
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
                                        <Link
                                            href={article.url}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Open original article
                                        </Link>
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

                <div className="mt-6 flex items-center justify-between rounded-xl border bg-white p-4 text-sm text-gray-700 shadow-sm">
                    <div>
                        Page {response.pagination.page} of {response.pagination.totalPages}
                    </div>

                    <div className="flex gap-2">
                        {hasPreviousPage ? (
                            <Link
                                href={`/articles?page=${page - 1}&limit=${limit}`}
                                className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                            >
                                Previous
                            </Link>
                        ) : (
                            <span className="rounded-lg border px-4 py-2 text-gray-400">
                                Previous
                            </span>
                        )}

                        {hasNextPage ? (
                            <Link
                                href={`/articles?page=${page + 1}&limit=${limit}`}
                                className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                            >
                                Next
                            </Link>
                        ) : (
                            <span className="rounded-lg border px-4 py-2 text-gray-400">
                                Next
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}