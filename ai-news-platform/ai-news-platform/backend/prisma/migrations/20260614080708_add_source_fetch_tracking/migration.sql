-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "lastFetchError" TEXT,
ADD COLUMN     "lastFetchStatus" TEXT,
ADD COLUMN     "lastFetchedAt" TIMESTAMP(3);
