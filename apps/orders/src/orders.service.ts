import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';

import { BILLING_SERVICE } from 'apps/orders/constants/services';
import { CreateOrderDto } from 'apps/orders/src/dto/CreateOrderDto.dto';
import { OrdersRepository } from 'apps/orders/src/orders.repository';
import { Orders } from 'apps/orders/src/schema/orders.schemas';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name) private orderService: Model<Orders>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,

    private readonly ordersRepository: OrdersRepository,
  ) {}

  async getHello() {
    return await this.orderService.find();
  }

  async createOrder(request: CreateOrderDto) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const orders = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        }),
      );
      await session.commitTransaction();
      return orders;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    }
  }
}
