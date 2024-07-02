import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponses } from '../decorators/api-responses-apply.decorator';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtClientGuard } from 'src/configs/auth/guards/client.guard';
import { DafitiToken } from '../decorators/dafiti-token.decorator';
import { CurrentClient } from 'src/configs/auth/decorators/client.decorator';
import { Client } from '@prisma/client';
import { DafitiProductsService } from './dafiti-products.service';
import { StockT } from '../types/response.types';

@UseGuards(JwtClientGuard)
@ApiResponses()
@ApiTags('Dafiti / Products')
@Controller('dafiti/products')
export class DafitiProductsController {
  constructor(private readonly dafitiProductsService: DafitiProductsService) {}

  @ApiQuery({
    name: 'productUuids',
    type: Array,
    description: 'El UUID de los productos a buscar',
    example:
      '["060cef12-08ef-4ae6-b15e-79398fedc774", "060cef12-08ef-4ae6-b15e-79398fedc774"]',
  })
  @Get()
  async getProductsByUUID(
    @DafitiToken() token: string = '',
    @CurrentClient() client: Client,
    @Query('productUuids') products: Array<string> = [],
  ) {
    return this.dafitiProductsService.getProductsByUUID({
      token,
      client,
      products,
    });
  }

  @ApiParam({
    name: 'sellerSku',
    type: String,
    description: 'El SKU del producto a buscar',
    example: '123456',
  })
  @Get(':sellerSku')
  async getProductsBySellerSku(
    @DafitiToken() token: string = '',
    @CurrentClient() client: Client,
    @Param('sellerSku') sellerSku: string = '',
  ) {
    return this.dafitiProductsService.getProductsBySellerSku({
      token,
      client,
      sellerSku,
    });
  }

  @ApiBody({
    type: Array,
    description:
      'Los productos a actualizar el stock en Dafiti por ID, 1 o mas productos a la vez , maximo 50 productos por request',
    examples: {
      stock: {
        value: [
          {
            productId: 123456,
            quantity: 10,
          },
        ],
        description: 'El ID es numerico y la cantidad es un entero',
        summary: 'Datos de ejemplo',
      },
    },
  })
  @Put('stock')
  async updateStock(
    @DafitiToken() token: string = '',
    @CurrentClient() client: Client,
    @Body() stock: Array<StockT> = [],
  ) {
    return this.dafitiProductsService.updateStockById({
      token,
      client,
      stock,
    });
  }
}
