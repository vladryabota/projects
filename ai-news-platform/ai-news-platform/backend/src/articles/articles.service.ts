import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleStatus, ArticleCategory, Prisma } from '@prisma/client';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import ollama from 'ollama';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllArticles() {
    return this.prisma.article.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createArticle(data) {
    return this.prisma.article.create({
      data: {
        title: data.title,
        url: data.url,
        sourceId: data.sourceId,
        category: data.category,
      },
    });
  }

  async getArticle(id) {
    if (id == null || id == undefined) {
      throw new NotFoundException('Id is undefined');
    }
    const res = await this.prisma.article.findUnique({
      where: { id },
      include: {
        source: true,
      },
    });
    if (res !== null) {
      return res;
    }

    throw new NotFoundException('Article was not found by id');
  }

  async extractArticleContent(url: string) {
    console.log('Downloading:', url);

    const response = await fetch(url);
    console.log('Status:', response.status);

    const html = await response.text();
    console.log('HTML length:', html.length);

    const doc = new JSDOM(html);

    const reader = new Readability(doc.window.document);
    const parsed = reader.parse();

    console.log('Parsed article:', parsed);

    return parsed ? parsed.textContent : null;
  }

  async fetchArticleContent(id) {
    if (id == null || id == undefined) {
      throw new NotFoundException('Id is undefined');
    }
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        source: true,
      },
    });
    if (article !== null) {
      const content = await this.extractArticleContent(article.url);
      if (!content) {
        throw new BadRequestException('Failed to extract article content');
      }
      const cleaned = content
        .replace(/\n{2,}/g, '\n\n')
        .replace(
          `Here is a summary of the article in 3-5 concise sentences: \n`,
          '',
        )
        .trim();

      console.log('Extracted content:', cleaned?.substring(0, 200));

      if (!cleaned) {
        throw new BadRequestException('Failed to extract article content');
      }

      return this.prisma.article.update({
        where: { id },
        data: {
          rawText: cleaned,
        },
      });
    }

    throw new NotFoundException('Article was not found by id');
  }

  async updateArticleStatus(id, status: ArticleStatus) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('Article was not found by id');
    }
    return this.prisma.article.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async filterArticles(
    status?: ArticleStatus,
    category?: ArticleCategory,
    search?: string,
    page?: number,
    limit?: number,
  ) {
    const safePage = page || 1;
    const safeLimit = limit || 10;
    const skip = (safePage - 1) * safeLimit;
    const where: Prisma.ArticleWhereInput = {
      status,
      category,
      title: search
        ? {
            contains: search,
            mode: 'insensitive',
          }
        : undefined,
    };

    const articles = await this.prisma.article.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        source: true,
      },
      take: safeLimit,
      skip,
    });

    const total = await this.prisma.article.count({
      where,
    });

    return {
      data: articles,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  }

  async getReviewQueue() {
    return this.prisma.article.findMany({
      where: {
        status: 'PENDING_REVIEW',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        source: true,
      },
    });
  }

  async getPublishedQueue() {
    return this.prisma.article.findMany({
      where: {
        status: 'APPROVED',
        publishedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        source: true,
      },
    });
  }

  async deleteArticle(id) {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article was not found by id');
    }

    return this.prisma.article.delete({
      where: { id },
    });
  }

  async markArticleAsPublished(id) {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });
    if (!article) {
      throw new NotFoundException('Article was not found by id');
    }

    return this.prisma.article.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });
  }
  async updateArticleSummary(id, summary) {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article was not found by id');
    }

    return this.prisma.article.update({
      where: { id },
      data: {
        summary,
      },
    });
  }

  private async generateSummaryFromModel(
    text: string,
    title: string,
  ): Promise<string> {
    const response = await ollama.generate({
      model: 'llama3.2:3b',
      prompt: `
You are an editor for an AI news platform.

Write a concise 3-5 sentence summary.
Rules:
- Return ONLY the summary.
- Do NOT include introductions.
- Do NOT write "Here is the summary".
- Do NOT use bullet points.
- Do NOT mention these instructions.
- Do NOT invent information.
- Use a neutral, journalistic style.

Title:
${title}

Article:
${text}
    `.trim(),
    });

    return response.response.trim();
  }

  async generateSummary(id: string) {
    let article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('Article was not found by id');
    }

    if (!article.rawText) {
      await this.fetchArticleContent(id);

      article = await this.prisma.article.findUnique({
        where: { id },
      });

      if (!article || !article.rawText) {
        throw new BadRequestException('Failed to fetch article content');
      }
    }

    const summary = await this.generateSummaryFromModel(
      article.rawText,
      article.title,
    );
    return this.prisma.article.update({
      where: { id },
      data: {
        summary,
      },
    });
  }
}
