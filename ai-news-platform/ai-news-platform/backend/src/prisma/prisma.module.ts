import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//PrismaModule = makes PrismaService available to other NestJS modules

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
