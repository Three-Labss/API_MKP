import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Client } from '@prisma/client';
import { CurrentClient } from 'src/configs/auth/decorators/client.decorator';
import { JwtClientGuard } from 'src/configs/auth/guards/client.guard';
import { DafitiService } from './dafiti.service';
import { ApiResponses } from './decorators/api-responses.decorator';
import { DafitiAuth } from './decorators/dafiti-auth.decorator';
import { PickUpT } from './types/response.types';

@UseGuards(JwtClientGuard)
@ApiResponses()
@ApiTags('Dafiti / Orders')
@Controller('dafiti')
export class DafitiController {
  constructor(private readonly dafitiService: DafitiService) {}

  @Get('orders/counters')
  async getAllOrdersCounters(
    @DafitiAuth() token: string = '',
    @CurrentClient() client: Client,
  ) {
    return await this.dafitiService.ordersCounters({ token, client });
  }

  @ApiQuery({
    name: 'limit',
    type: 'string',
    description: 'El limite maximo de ordenes',
    example: '10',
  })
  @Get('orders/pending')
  async getAllOrdersPending(
    @DafitiAuth() token: string = '',
    @CurrentClient() client: Client,
    @Query('limit') limit: string = '10',
  ) {
    return await this.dafitiService.ordersPending({ token, client, limit });
  }

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
    @CurrentClient() client: Client,
    @Body() pickup: PickUpT,
  ) {
    return await this.dafitiService.setOrdersReadyToShip({
      token,
      client,
      pickup,
    });
  }

  @Get('orders/ready-to-ship')
  async getAllOrdersReadyToShip(
    @DafitiAuth() token: string = '',
    @CurrentClient() client: Client,
    @Query('limit') limit: string = '10',
  ) {
    return await this.dafitiService.ordersReadyToShip({ token, client, limit });
  }

  @ApiQuery({
    name: 'limit',
    type: 'string',
    description: 'El limite maximo de ordenes',
    example: '10',
  })
  @Get('orders/shipped')
  async getAllOrdersShipped(
    @DafitiAuth() token: string = '',
    @CurrentClient() client: Client,
    @Query('limit') limit: string = '10',
  ) {
    return await this.dafitiService.ordersShipped({ token, client, limit });
  }

  @ApiQuery({
    name: 'limit',
    type: 'string',
    description: 'El limite maximo de ordenes',
    example: '10',
  })
  @Get('orders/delivered')
  async getAllOrdersDelivered(
    @DafitiAuth() token: string = '',
    @CurrentClient() client: Client,
    @Query('limit') limit: string = '10',
  ) {
    return await this.dafitiService.ordersDelivered({ token, client, limit });
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'El id de la orden',
    example: 123435,
  })
  @Get('orders/:id')
  async getOrderById(
    @DafitiAuth() token: string = '',
    @CurrentClient() client: Client,
    @Param('id') id: number = 12345,
  ) {
    return await this.dafitiService.orderById({ token, client, id });
  }
}
