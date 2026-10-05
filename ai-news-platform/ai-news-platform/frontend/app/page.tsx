import Link from "next/link";
import { apiFetch } from "@/src/lib/api";

type Source = {
  id: string;
  name: string;
  active: boolean;
  lastFetchStatus: string | null;
};

type Article = {
  id: string;
  title: string;
  status: string;
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

type HealthResponse = {
  status: string;
  database: string;
  timestamp: string;
};

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  href?: string;
};

function StatCard({ title, value, description, href }: StatCardProps) {
  const content = (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export default async function HomePage() {
  const [
    health,
    sources,
    allArticles,
    pendingReviewArticles,
    publishQueue,
    publishedArticles,
  ] = await Promise.all([
    apiFetch<HealthResponse>("/health"),
    apiFetch<Source[]>("/sources"),
    apiFetch<ArticlesResponse>("/articles?page=1&limit=1"),
    apiFetch<ArticlesResponse>("/articles?status=PENDING_REVIEW&page=1&limit=1"),
    apiFetch<Article[]>("/articles/publish-queue"),
    apiFetch<ArticlesResponse>("/articles?status=PUBLISHED&page=1&limit=1"),
  ]);

  const totalSources = sources.length;
  const activeSources = sources.filter((source) => source.active).length;
  const failedSources = sources.filter(
    (source) => source.lastFetchStatus === "FAILED",
  ).length;

  const totalArticles = allArticles.pagination.total;
  const pendingReviewCount = pendingReviewArticles.pagination.total;
  const readyToPublishCount = publishQueue.length;
  const publishedCount = publishedArticles.pagination.total;

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-10">
      <nav className="mb-8 flex items-center gap-3 text-sm text-gray-600">
        <span className="font-medium text-black">Dashboard</span>
      </nav>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI News Platform
          </h1>
          <p className="mt-2 text-gray-600">
            Admin dashboard for sources, article review, and publishing.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/sources"
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Sources
          </Link>

          <Link
            href="/articles"
            className="rounded-lg border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Articles
          </Link>
        </div>
      </div>

      <section className="mb-8 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              System health
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Backend: {health.status} | Database: {health.database}
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Last checked: {new Date(health.timestamp).toLocaleString()}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total sources"
          value={totalSources}
          description={`${activeSources} active source(s)`}
          href="/sources"
        />

        <StatCard
          title="Failed sources"
          value={failedSources}
          description="Sources with failed last fetch"
          href="/sources"
        />

        <StatCard
          title="Total articles"
          value={totalArticles}
          description="All imported articles"
          href="/articles"
        />

        <StatCard
          title="Pending review"
          value={pendingReviewCount}
          description="Articles waiting for approval"
          href="/articles/review-queue"
        />

        <StatCard
          title="Ready to publish"
          value={readyToPublishCount}
          description="Approved articles not yet published"
          href="/articles/publish-queue"
        />

        <StatCard
          title="Published"
          value={publishedCount}
          description="Articles marked as published"
          href="/articles?status=PUBLISHED"
        />
      </section>

      <section className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Quick actions</h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/sources"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Manage sources
          </Link>

          <Link
            href="/articles/review-queue"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Review articles
          </Link>

          <Link
            href="/articles/publish-queue"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Publish queue
          </Link>
        </div>
      </section>
    </main>
  );
}