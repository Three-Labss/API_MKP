import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CHANNELS } from '@prisma/client';
import { HttpsService } from '../http/https.service';
import { OrderEntryService } from '../orderEntry/orderEntry.service';
import { DAFITI, RESPONSES } from './constants';
import { RequestResponse } from './types/response.types';

@Injectable()
export class DafitiService {
  private readonly channel = CHANNELS.DAFITI;
  constructor(
    private readonly httpsService: HttpsService,
    private readonly orderEntryService: OrderEntryService,
  ) {}

  async ordersCounters({ token, client }: RequestResponse) {
    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.getHttps({
        method: 'GET',
        url: `${DAFITI.URL_API}/orders-counters`,
        token,
      });
    } catch (error) {
      throw new BadRequestException(RESPONSES.BAD_REQUEST);
    }
  }

  async ordersPending({ token, client, limit }: RequestResponse) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.getHttps({
        method: 'GET',
        url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_pending&sortDir=desc`,
        token,
      });
    } catch (error) {
      throw new BadRequestException(RESPONSES.BAD_REQUEST);
    }
  }

  async setOrdersReadyToShip({ token, client, pickup }: RequestResponse) {
    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.postHttps({
        method: 'POST',
        url: `${DAFITI.URL_API}/orders/statuses/set-to-ready-to-ship`,
        token,
        data: pickup,
      });
    } catch (error) {
      throw new BadRequestException(RESPONSES.BAD_REQUEST);
    }
  }

  async ordersReadyToShip({ token, client, limit }: RequestResponse) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.getHttps({
        method: 'GET',
        url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_ready_to_ship&sortDir=asc`,
        token,
      });
    } catch (error) {
      throw new BadRequestException(RESPONSES.BAD_REQUEST);
    }
  }

  async ordersShipped({ token, client, limit }: RequestResponse) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.getHttps({
        method: 'GET',
        url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_shipped&sortDir=asc`,
        token,
      });
    } catch (error) {
      throw new BadRequestException(RESPONSES.BAD_REQUEST);
    }
  }

  async ordersDelivered({ token, client, limit }: RequestResponse) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    await this.orderEntryService.getOrderEntryById(client.id, this.channel);

    try {
      return await this.httpsService.getHttps({
        method: 'GET',
        url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_delivered&sortDir=asc`,
        token,
      });
    } catch (error) {
      throw new BadRequestException(RESPONSES.BAD_REQUEST);
    }
  }

  async orderById({ token, client, id }: RequestResponse) {
    await this.orderEntryService.getOrderEntryById(client.id, this.channel);
    try {
      return await this.httpsService.getHttps({
        method: 'GET',
        url: `${DAFITI.URL_API}/orders/${id}`,
        token,
      });
    } catch (error) {
      throw new NotFoundException(RESPONSES.NOT_FOUND);
    }
  }
}
