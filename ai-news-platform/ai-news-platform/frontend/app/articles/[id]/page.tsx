import { apiFetch } from "@/src/lib/api";
import Link from "next/link";
import { ArticleSummaryForm } from "./ArticleSummaryForm";

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
    summary: string | null;
};

export default async function ArticlePage({
    params,
}: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = await apiFetch<Article>(`/articles/${id}`);
    return (
        <main className="min-h-screen bg-gray-50 px-8 py-10">
            <nav className="mb-8 flex items-center gap-3 text-sm text-gray-600">
                <Link href="/" className="hover:text-black">
                    Home
                </Link>
                <span>/</span>
                <Link href="/articles" className="hover:text-black">
                    Articles
                </Link>
                <span>/</span>
                <span className="font-medium text-black">{article.title}</span>
            </nav>

            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
                    <p className="mt-2 text-gray-600">
                        {article.source?.name} - {article.category} - {article.status}
                    </p>
                </div>

                <a
                    href={article.url}
                    target="_blank"
                    className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                >
                    View original article
                </a>
            </div>

            <div className="grid gap-4">
                <section className="rounded-xl border bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Article Details
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Created at: {new Date(article.createdAt).toLocaleString()}
                            </p>
                            {article.publishedAt && (
                                <p className="mt-1 text-sm text-gray-600">
                                    Published at: {new Date(article.publishedAt).toLocaleString()}
                                </p>
                            )}

                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-5 mt-5">Article Summary:</h2>
                                <p className="text-gray-600 mb-5">
                                    {article.summary ? article.summary : "No summary available"}
                                </p>
                            </div>

                            <ArticleSummaryForm articleId={article.id} initialSummary="" />

                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}