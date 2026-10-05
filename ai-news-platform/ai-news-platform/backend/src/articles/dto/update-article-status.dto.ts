import { ArticleStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateArticleStatusDto {
  @IsEnum(ArticleStatus)
  status!: ArticleStatus;
}
