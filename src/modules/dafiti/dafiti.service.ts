import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { HttpsService } from '../http/https.service';
import { DAFITI, RESPONSES } from './constants';
import { RequestResponse } from './types/response.types';

@Injectable()
export class DafitiService {
  constructor(private readonly httpsService: HttpsService) {}

  async ordersCounters({ token }: RequestResponse) {
    return await this.httpsService.getHttps({
      method: 'GET',
      url: `${DAFITI.URL_API}/orders-counters`,
      token,
    });
  }

  async ordersPending({ token, limit }: RequestResponse) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    return await this.httpsService.getHttps({
      method: 'GET',
      url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_pending&sortDir=desc`,
      token,
    });
  }

  async setOrdersReadyToShip({ token, pickup }: RequestResponse) {
    return await this.httpsService.postHttps({
      method: 'POST',
      url: `${DAFITI.URL_API}/orders/statuses/set-to-ready-to-ship`,
      token,
      data: pickup,
    });
  }

  async ordersReadyToShip({ token, limit }: RequestResponse) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    return await this.httpsService.getHttps({
      method: 'GET',
      url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_ready_to_ship&sortDir=asc`,
      token,
    });
  }

  async ordersShipped({ token, limit }: RequestResponse) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    return await this.httpsService.getHttps({
      method: 'GET',
      url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_shipped&sortDir=asc`,
      token,
    });
  }

  async ordersDelivered({ token, limit }: RequestResponse) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    return await this.httpsService.getHttps({
      method: 'GET',
      url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_delivered&sortDir=asc`,
      token,
    });
  }

  async orderById({ token, id }: RequestResponse) {
    return await this.httpsService.getHttps({
      method: 'GET',
      url: `${DAFITI.URL_API}/orders/${id}`,
      token,
    });
  }
}
