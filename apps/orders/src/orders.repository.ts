import { AbstractRepository } from '@app /common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Orders } from 'apps/orders/src/schema/orders.schemas';
import { Connection, Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends AbstractRepository<Orders> {
  protected readonly logger = new Logger(OrdersRepository.name);

  constructor(
    @InjectModel(Orders.name) orderModel: Model<Orders>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
