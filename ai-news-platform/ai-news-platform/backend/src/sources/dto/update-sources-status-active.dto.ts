import { IsBoolean } from 'class-validator';

export class UpdateSourceActiveDto {
  @IsBoolean()
  active!: boolean;
}
