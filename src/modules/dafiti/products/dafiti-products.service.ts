import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CHANNELS } from '@prisma/client';
import { HttpsService } from 'src/modules/http/https.service';
import { OrderEntryService } from 'src/modules/orderEntry/orderEntry.service';
import { RequestResponse } from '../types/response.types';
import { DAFITI, RESPONSES } from '../constants';

@Injectable()
export class DafitiProductsService {
  private readonly channel = CHANNELS.DAFITI;
  constructor(
    private readonly httpsService: HttpsService,
    private readonly orderEntryService: OrderEntryService,
  ) {}

  async getProductsByUUID({ token, client, products }: RequestResponse) {
    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.getHttps({
        method: 'GET',
        url: Array.isArray(products)
          ? `${DAFITI.URL_API}/products?${products.map((product) => `productUuids%5B%5D=${product}`).join('&')}`
          : `${DAFITI.URL_API}/products?productUuids%5B%5D=${products}`,
        token,
      });
    } catch (error) {
      throw new NotFoundException(RESPONSES.NOT_FOUND);
    }
  }

  async getProductsBySellerSku({ token, client, sellerSku }: RequestResponse) {
    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.getHttps({
        method: 'GET',
        url: `${DAFITI.URL_API}/product/seller-sku/${sellerSku}`,
        token,
      });
    } catch (error) {
      throw new NotFoundException(RESPONSES.NOT_FOUND);
    }
  }

  async updateStockById({ token, client, stock }: RequestResponse) {
    if (stock.length > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.putHttps({
        method: 'PUT',
        url: `${DAFITI.URL_API}/stock/product`,
        token,
        data: stock,
      });
    } catch (error) {
      throw new BadRequestException(RESPONSES.BAD_REQUEST);
    }
  }
}
