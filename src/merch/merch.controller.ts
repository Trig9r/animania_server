import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { MerchService } from './merch.service';
import { GetAllMerchResponse, GetOneMerchByNameResponse } from './types';

@Controller('merch')
@ApiTags('Merch 👕🛍️💲')
export class MerchController {
  constructor(private readonly merchService: MerchService) {}

  @ApiOkResponse({ type: GetAllMerchResponse })
  @Get()
  paginateAndFilter(@Query() query) {
    return this.merchService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: GetOneMerchByNameResponse })
  @Get('/:name')
  getOne(@Param('name') name: string) {
    return this.merchService.getOne(name);
  }
}
