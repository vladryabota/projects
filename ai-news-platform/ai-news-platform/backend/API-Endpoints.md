# API Endpoints

## Health
GET /health

## Sources
GET /sources
GET /sources/:id
POST /sources
PATCH /sources/:id/active
POST /sources/:id/fetch
POST /sources/fetch-all

## Articles
GET /articles
GET /articles/:id
GET /articles/review-queue
GET /articles/publish-queue
POST /articles
PATCH /articles/:id/status
PATCH /articles/:id/published
DELETE /articles/:id