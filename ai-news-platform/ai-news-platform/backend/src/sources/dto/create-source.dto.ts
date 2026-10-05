import { ArticleCategory, SourceType } from '@prisma/client';
import { IsString, IsEnum, IsUrl } from 'class-validator';

export class createSourceDto {
  @IsString()
  name!: string;

  @IsUrl()
  url!: string;

  @IsEnum(SourceType)
  type!: SourceType;

  @IsEnum(ArticleCategory)
  category!: ArticleCategory;
}
