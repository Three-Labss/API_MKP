import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtClientGuard } from 'src/configs/auth/guards/client.guard';
import { RESPONSES } from './constants';
import { DafitiService } from './dafiti.service';
import { DafitiAuth } from './decorators/dafiti-auth.decorator';
import { PickUpT } from './types/response.types';

@ApiTags('Dafiti')
@ApiTags('Orders')
@UseGuards(JwtClientGuard)
@Controller('dafiti')
export class DafitiController {
  constructor(private readonly dafitiService: DafitiService) {}

  @ApiResponse({
    status: 200,
    description: RESPONSES.SUCCESS,
    links: {},
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: RESPONSES.UNAUTHORIZED,
    links: {},
  })
  @ApiResponse({
    status: 404,
    description: RESPONSES.NOT_FOUND,
    links: {},
  })
  @ApiResponse({
    status: 408,
    description: RESPONSES.LIMIT,
    links: {},
  })
  @Get('orders/counters')
  async getAllOrdersCounters(@DafitiAuth() token: string = '') {
    return await this.dafitiService.ordersCounters({ token });
  }

  @ApiResponse({
    status: 200,
    description: RESPONSES.SUCCESS,
    links: {},
  })
  @ApiResponse({
    status: 401,
    description: RESPONSES.UNAUTHORIZED,
    links: {},
  })
  @ApiResponse({
    status: 404,
    description: RESPONSES.NOT_FOUND,
    links: {},
  })
  @ApiResponse({
    status: 408,
    description: RESPONSES.LIMIT,
    links: {},
  })
  @ApiQuery({
    name: 'limit',
    type: 'string',
    description: 'El limite maximo de ordenes',
    example: '10',
  })
  @Get('orders/pending')
  async getAllOrdersPending(
    @DafitiAuth() token: string = '',
    @Query('limit') limit: string = '10',
  ) {
    return await this.dafitiService.ordersPending({ token, limit });
  }

  @ApiResponse({
    status: 200,
    description: RESPONSES.SUCCESS,
    links: {},
  })
  @ApiResponse({
    status: 401,
    description: RESPONSES.UNAUTHORIZED,
    links: {},
  })
  @ApiResponse({
    status: 404,
    description: RESPONSES.NOT_FOUND,
    links: {},
  })
  @ApiResponse({
    status: 408,
    description: RESPONSES.LIMIT,
    links: {},
  })
  @ApiBody({
    type: Object,
    description: 'La orden a cambiar de estado a lista para enviar',
    examples: {
      pickup: {
        value: {
          orderItems: [
            {
              id: 12345,
            },
            {
              id: 54321,
            },
          ],
          deliveryType: 'pickup',
          shippingProvider: 'Dafiti carrier',
        },
      },
    },
  })
  @Post('orders/ready-to-ship')
  async setOrdersReadyToShip(
    @DafitiAuth() token: string = '',
    @Body() pickup: PickUpT,
  ) {
    return await this.dafitiService.setOrdersReadyToShip({ token, pickup });
  }

  @ApiResponse({
    status: 200,
    description: RESPONSES.SUCCESS,
    links: {},
  })
  @ApiResponse({
    status: 401,
    description: RESPONSES.UNAUTHORIZED,
    links: {},
  })
  @ApiResponse({
    status: 404,
    description: RESPONSES.NOT_FOUND,
    links: {},
  })
  @ApiResponse({
    status: 408,
    description: RESPONSES.LIMIT,
    links: {},
  })
  @ApiQuery({
    name: 'limit',
    type: 'string',
    description: 'El limite maximo de ordenes',
    example: '10',
  })
  @Get('orders/ready-to-ship')
  async getAllOrdersReadyToShip(
    @DafitiAuth() token: string = '',
    @Query('limit') limit: string = '10',
  ) {
    return await this.dafitiService.ordersReadyToShip({ token, limit });
  }

  @ApiResponse({
    status: 200,
    description: RESPONSES.SUCCESS,
    links: {},
  })
  @ApiResponse({
    status: 401,
    description: RESPONSES.UNAUTHORIZED,
    links: {},
  })
  @ApiResponse({
    status: 404,
    description: RESPONSES.NOT_FOUND,
    links: {},
  })
  @ApiResponse({
    status: 408,
    description: RESPONSES.LIMIT,
    links: {},
  })
  @ApiQuery({
    name: 'limit',
    type: 'string',
    description: 'El limite maximo de ordenes',
    example: '10',
  })
  @Get('orders/shipped')
  async getAllOrdersShipped(
    @DafitiAuth() token: string = '',
    @Query('limit') limit: string = '10',
  ) {
    return await this.dafitiService.ordersShipped({ token, limit });
  }

  @ApiResponse({
    status: 200,
    description: RESPONSES.SUCCESS,
    links: {},
  })
  @ApiResponse({
    status: 401,
    description: RESPONSES.UNAUTHORIZED,
    links: {},
  })
  @ApiResponse({
    status: 404,
    description: RESPONSES.NOT_FOUND,
    links: {},
  })
  @ApiResponse({
    status: 408,
    description: RESPONSES.LIMIT,
    links: {},
  })
  @ApiQuery({
    name: 'limit',
    type: 'string',
    description: 'El limite maximo de ordenes',
    example: '10',
  })
  @Get('orders/delivered')
  async getAllOrdersDelivered(
    @DafitiAuth() token: string = '',
    @Query('limit') limit: string = '10',
  ) {
    return await this.dafitiService.ordersDelivered({ token, limit });
  }

  @ApiResponse({
    status: 200,
    description: RESPONSES.SUCCESS,
    links: {},
  })
  @ApiResponse({
    status: 401,
    description: RESPONSES.UNAUTHORIZED,
    links: {},
  })
  @ApiResponse({
    status: 404,
    description: RESPONSES.NOT_FOUND,
    links: {},
  })
  @ApiResponse({
    status: 408,
    description: RESPONSES.LIMIT,
    links: {},
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'El id de la orden',
    example: 123435,
  })
  @Get('orders/:id')
  async getOrderById(
    @DafitiAuth() token: string = '',
    @Param('id') id: number = 12345,
  ) {
    return await this.dafitiService.orderById({ token, id });
  }
}
