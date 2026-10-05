import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { UpdateSourceActiveDto } from './dto/update-sources-status-active.dto';
import { createSourceDto } from './dto/create-source.dto';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}
  @Get()
  getAllSources() {
    return this.sourcesService.getAllSources();
  }

  @Get(':id')
  getSourceById(@Param('id') id: string) {
    return this.sourcesService.getSourceById(id);
  }

  @Post()
  createSource(@Body() body: createSourceDto) {
    return this.sourcesService.createSource(body);
  }

  @Post('fetch-all')
  fetchAllSources() {
    return this.sourcesService.fetchAllSources();
  }

  @Post(':id/fetch')
  fetchSource(@Param('id') id: string) {
    return this.sourcesService.fetchSource(id);
  }
  @Patch(':id/active')
  updateSourceActive(
    @Param('id') id: string,
    @Body() body: UpdateSourceActiveDto,
  ) {
    return this.sourcesService.updateSourceActive(id, body.active);
  }
}
