import {
  Controller,
  Param,
  Patch,
  Query,
  BadRequestException,
  Search,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ArticleCategory, ArticleStatus } from '@prisma/client';
import { ArticlesService } from './articles.service';
import { UpdateArticleStatusDto } from './dto/update-article-status.dto';
import { UpdateArticleSummaryDto } from './dto/update-article-summary.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  getArticles(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('category') category?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 10;
    const normalizedStatus = status?.toUpperCase() as ArticleStatus | undefined;
    const normalizedCategory = category?.toUpperCase() as
      | ArticleCategory
      | undefined;

    if (
      normalizedStatus &&
      !Object.values(ArticleStatus).includes(normalizedStatus)
    ) {
      throw new BadRequestException('Invalid status');
    }

    if (
      normalizedCategory &&
      !Object.values(ArticleCategory).includes(normalizedCategory)
    ) {
      throw new BadRequestException('Invalid category');
    }

    if (
      search ||
      normalizedStatus ||
      normalizedCategory ||
      pageNumber ||
      limitNumber
    ) {
      return this.articlesService.filterArticles(
        normalizedStatus,
        normalizedCategory,
        search,
        pageNumber,
        limitNumber,
      );
    }
    return this.articlesService.getAllArticles();
  }

  @Get('/publish-queue')
  getPublishQueue() {
    return this.articlesService.getPublishedQueue();
  }

  @Get('/review-queue')
  getReviewQueue() {
    return this.articlesService.getReviewQueue();
  }

  @Get(':id')
  getArticle(@Param('id') id: string) {
    return this.articlesService.getArticle(id);
  }

  @Patch(':id/summary')
  updateArticleSummary(
    @Param('id') id: string,
    @Body() body: UpdateArticleSummaryDto,
  ) {
    return this.articlesService.updateArticleSummary(id, body.summary);
  }

  @Post()
  createArticle(@Body() body) {
    return this.articlesService.createArticle(body);
  }

  @Patch(':id/status')
  updateArticleStatus(
    @Param('id') id: string,
    @Body() body: UpdateArticleStatusDto,
  ) {
    return this.articlesService.updateArticleStatus(id, body.status);
  }

  @Patch(':id/published')
  markArticleAsPublished(@Param('id') id: string) {
    return this.articlesService.markArticleAsPublished(id);
  }
  @Patch(':id/fetch-content')
  fetchArticleContent(@Param('id') id: string) {
    return this.articlesService.fetchArticleContent(id);
  }

  @Patch(':id/generate-summary')
  generateSummary(@Param('id') id: string) {
    return this.articlesService.generateSummary(id);
  }
}
