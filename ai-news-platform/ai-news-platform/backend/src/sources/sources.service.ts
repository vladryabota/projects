import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Parser from 'rss-parser';
@Injectable()
export class SourcesService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllSources() {
    return this.prisma.source.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createSource(data) {
    const existingSource = await this.prisma.source.findUnique({
      where: {
        url: data.url,
      },
    });

    if (existingSource) {
      throw new ConflictException('Source with this URL already exists');
    }
    return this.prisma.source.create({
      data: {
        name: data.name,
        url: data.url,
        type: data.type,
        category: data.category,
      },
    });
  }

  async fetchAllSources() {
    const sources = await this.prisma.source.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        active: true,
      },
    });

    const results: any[] = [];

    for (const source of sources) {
      try {
        const result = await this.fetchSource(source.id);
        results.push({
          sourceId: source.id,
          sourceName: source.name,
          result,
        });
      } catch (error) {
        results.push({
          sourceId: source.id,
          sourceName: source.name,
          status: 'FAILED',
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    return {
      message: 'Fetch all completed',
      totalSources: sources.length,
      results,
    };
  }

  async fetchSource(id) {
    const result = await this.prisma.source.findUnique({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException('Source is not found by id');
    }

    const cooldownMs = 60 * 1000; // 1 minute

    if (result.lastFetchedAt) {
      const now = new Date();
      const lastFetched = new Date(result.lastFetchedAt);
      const diffMs = now.getTime() - lastFetched.getTime();

      if (diffMs < cooldownMs) {
        throw new BadRequestException('Source was fetched too recently');
      }
    }

    let imported = 0;
    let skipped = 0;
    try {
      const res = await this.fetchRss(result);
      for (const obj of res.preview) {
        if (!obj.title || !obj.link) {
          continue;
        }

        const existingArticle = await this.prisma.article.findUnique({
          where: {
            url: obj.link,
          },
        });

        if (existingArticle) {
          skipped++;
          continue;
        }
        await this.prisma.article.create({
          data: {
            sourceId: result.id,
            title: obj.title,
            url: obj.link,
            category: result.category,
            status: 'PENDING_REVIEW',
          },
        });
        imported++;
      }
      await this.prisma.source.update({
        where: { id: result.id },
        data: {
          lastFetchedAt: new Date(),
          lastFetchStatus: 'SUCCESS',
          lastFetchError: null,
        },
      });
      return {
        message: 'Fetch completed',
        found: res.itemsCount,
        imported,
        skipped,
      };
    } catch (error) {
      await this.prisma.source.update({
        where: { id: result.id },
        data: {
          lastFetchedAt: new Date(),
          lastFetchStatus: 'FAILED',
          lastFetchError:
            error instanceof Error ? error.message : String(error),
        },
      });

      throw new BadRequestException('Failed to fetch source RSS');
    }
  }

  async fetchRss(source) {
    const parser = new Parser();
    const feed = await parser.parseURL(source.url);
    return {
      feedTitle: feed.title,
      itemsCount: feed.items.length,
      preview: feed.items.slice(0, feed.items.length).map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
      })),
    };
  }

  async updateSourceActive(id, active) {
    const source = await this.prisma.source.findUnique({
      where: {
        id,
      },
    });

    if (!source) {
      throw new NotFoundException('Source was not found by id');
    }

    return this.prisma.source.update({
      where: { id },
      data: {
        active,
      },
    });
  }

  async getSourceById(id) {
    const source = await this.prisma.source.findUnique({
      where: {
        id,
      },
      include: {
        articles: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    if (!source) {
      throw new NotFoundException('Source was not found by id');
    }
    return source;
  }
}
