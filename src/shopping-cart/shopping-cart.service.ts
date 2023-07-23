import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ShoppingCart } from './shopping-cart.model';
import { UsersService } from 'src/users/users.service';
import { MerchService } from 'src/merch/merch.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart)
    private shoppingCartModel: typeof ShoppingCart,
    private readonly usersService: UsersService,
    private readonly merchService: MerchService,
  ) {}

  async findAll(userId: number | string): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new ShoppingCart();
    const user = await this.usersService.findOne({
      where: { nickname: addToCartDto.nickname },
    });
    const merch = await this.merchService.getOne(addToCartDto.merchName);

    cart.userId = user.id;
    cart.name = merch.name;
    cart.type = merch.type;
    cart.size = JSON.parse(merch.sizes)[0];
    cart.price = merch.price;
    cart.color = merch.color;
    cart.quantity = merch.quantity;
    cart.image = JSON.parse(merch.images)[0];
    cart.total_price = merch.price;

    return cart.save();
  }

  async updateCount(
    count: number,
    merchName: string,
  ): Promise<{ count: number }> {
    await this.shoppingCartModel.update(
      { count },
      { where: { name: merchName } },
    );

    const merch = await this.shoppingCartModel.findOne({
      where: { name: merchName },
    });
    return { count: merch.count };
  }

  async updateTotalPrice(
    total_price: number,
    merchName: string,
  ): Promise<{ total_price: number }> {
    await this.shoppingCartModel.update(
      { total_price },
      { where: { name: merchName } },
    );

    const merch = await this.shoppingCartModel.findOne({
      where: { name: merchName },
    });
    return { total_price: merch.total_price };
  }

  async remove(merchName: string): Promise<void> {
    const merch = await this.shoppingCartModel.findOne({
      where: { name: merchName },
    });

    await merch.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.shoppingCartModel.destroy({ where: { userId } });
  }
}
