-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('RSS', 'API', 'SCRAPER');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DISCOVERED', 'FETCHED', 'SUMMARIZED', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'PUBLISHED', 'FAILED');

-- CreateEnum
CREATE TYPE "ArticleCategory" AS ENUM ('HEALTH', 'SPACE', 'POLITICS', 'CRIME', 'TECHNOLOGY', 'SCIENCE', 'EMERGENCY', 'OTHER');

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "SourceType" NOT NULL DEFAULT 'RSS',
    "category" "ArticleCategory" NOT NULL DEFAULT 'OTHER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "rawText" TEXT,
    "summary" TEXT,
    "category" "ArticleCategory" NOT NULL DEFAULT 'OTHER',
    "status" "ArticleStatus" NOT NULL DEFAULT 'DISCOVERED',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Article_url_key" ON "Article"("url");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;
