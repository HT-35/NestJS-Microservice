import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'apps/orders/src/dto/CreateOrderDto.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello() {
    console.log('');
    console.log('');
    console.log('getHello');
    console.log('');
    console.log('');
    console.log('');
    return this.ordersService.getHello();
  }

  @Post()
  createOrder(@Body() request: CreateOrderDto) {
    //return 'check post';

    console.log('');
    console.log('');
    console.log('request', request);
    console.log('');
    console.log('');
    console.log('');

    return this.ordersService.createOrder(request);
  }
}
