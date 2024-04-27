import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtClientGuard } from 'src/configs/auth/guards/client.guard';
import { RESPONSES } from './constants';
import { DafitiService } from './dafiti.service';
import { DafitiAuth } from './decorators/dafiti-auth.decorator';

@ApiTags('Dafiti')
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
    status: 408,
    description: RESPONSES.LIMIT,
    links: {},
  })
  @Get('orders/pending')
  async getAllOrdersPending(
    @DafitiAuth() token: string = '',
  ): Promise<{ totalOrdenesPendientes: number }> {
    return await this.dafitiService.ordersPendingCount(token);
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
    return await this.dafitiService.ordersReadyToShip(token, limit);
  }

  @Get('order/new')
  async getNewOrder() {
    return console.log('new order');
  }
}
