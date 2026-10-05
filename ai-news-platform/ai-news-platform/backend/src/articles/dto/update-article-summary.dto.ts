import { IsString } from 'class-validator';

export class UpdateArticleSummaryDto {
  @IsString()
  summary!: string;
}
