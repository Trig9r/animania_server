import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { AnimeTitleService } from './anime-title.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetAllAnimeTitlesResponce,
  GetAnimeTitlesBySearchRequet,
  GetAnimeTitlesBySearchResponse,
  GetNewAnimeTitlesResponce,
  GetOneTitleRequest,
  GetOneTitleResponse,
  GetOneTitleWithEpisodesRequest,
  GetOneTitleWithEpisodesResponse,
  PaginateAndFilterResponse,
} from './types';

@Controller('anime-title')
@ApiTags('Anime 👒⚔🏴‍☠️🌊')
export class AnimeTitleController {
  constructor(private readonly animeTitleService: AnimeTitleService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @Get()
  paginateAndFilter(@Query() query) {
    return this.animeTitleService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: GetAllAnimeTitlesResponce })
  @Get('/all')
  getAll() {
    return this.animeTitleService.getAll();
  }

  @ApiOkResponse({ type: GetNewAnimeTitlesResponce })
  @Get('/new')
  getNew() {
    return this.animeTitleService.new();
  }

  @ApiBody({ type: GetAnimeTitlesBySearchRequet })
  @ApiOkResponse({ type: GetAnimeTitlesBySearchResponse })
  @Post('/search')
  search(@Body() { search }: { search: string }) {
    return this.animeTitleService.searchByString(search);
  }

  @ApiBody({ type: GetOneTitleRequest })
  @ApiOkResponse({ type: GetOneTitleResponse })
  @Get('/find/:name')
  getOneTitle(@Param('name') name: string) {
    return this.animeTitleService.findOneByName(name);
  }

  @ApiBody({ type: GetOneTitleWithEpisodesRequest })
  @ApiOkResponse({ type: GetOneTitleWithEpisodesResponse })
  @Get('/:name')
  getOne(@Param('name') name: string) {
    return this.animeTitleService.findOne(name);
  }
}
