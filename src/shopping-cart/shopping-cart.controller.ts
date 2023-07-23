import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ShoppingCartService } from './shopping-cart.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import {
  AddToCartNewItemResponse,
  GetAllCartItemsResponse,
  UpdateCountForItemCartRequest,
  UpdateCountForItemCartResponse,
  UpdateTotalPriceForItemCartRequest,
  UpdateTotalPriceForItemCartResponse,
} from './types';

@Controller('shopping-cart')
@ApiTags('Shopping cart 🛒🛍️')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOkResponse({ type: [GetAllCartItemsResponse] })
  @Get(':userId')
  getAll(@Param('userId') userId: string) {
    return this.shoppingCartService.findAll(userId);
  }

  @ApiOkResponse({ type: AddToCartNewItemResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('/add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.shoppingCartService.add(addToCartDto);
  }

  @ApiBody({ type: UpdateCountForItemCartRequest })
  @ApiOkResponse({ type: UpdateCountForItemCartResponse })
  @UseGuards(AuthenticatedGuard)
  @Patch('/count/:merchName')
  updateCount(
    @Body() { count }: { count: number },
    @Param('merchName') merchName: string,
  ) {
    return this.shoppingCartService.updateCount(count, merchName);
  }

  @ApiBody({ type: UpdateTotalPriceForItemCartRequest })
  @ApiOkResponse({ type: UpdateTotalPriceForItemCartResponse })
  @UseGuards(AuthenticatedGuard)
  @Patch('/total-price/:merchName')
  updateTotalPrice(
    @Body() { total_price }: { total_price: number },
    @Param('merchName') merchName: string,
  ) {
    return this.shoppingCartService.updateTotalPrice(total_price, merchName);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/one/:merchName')
  removeOne(@Param('merchName') merchName: string) {
    return this.shoppingCartService.remove(merchName);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/all/:userId')
  removeAll(@Param('userId') userId: string) {
    return this.shoppingCartService.removeAll(userId);
  }
}
