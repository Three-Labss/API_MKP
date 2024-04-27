import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { HttpsService } from '../http/https.service';
import { DAFITI, RESPONSES } from './constants';

@Injectable()
export class DafitiService {
  constructor(private readonly httpsService: HttpsService) {}

  async ordersPendingCount(
    token: string,
  ): Promise<{ totalOrdenesPendientes: number }> {
    const ordersPending = await this.httpsService.getHttps({
      method: 'GET',
      url: `${DAFITI.URL_API}/orders?limit=50&offset=0&section=status_pending`,
      token,
    });

    return {
      totalOrdenesPendientes: ordersPending.items.length,
    };
  }

  async ordersReadyToShip(token: string, limit: string) {
    if (Number(limit) > 50) throw new RequestTimeoutException(RESPONSES.LIMIT);

    return await this.httpsService.getHttps({
      method: 'GET',
      url: `${DAFITI.URL_API}/orders?limit=${limit}&offset=0&section=status_ready_to_ship&sortDir=asc`,
      token,
    });
  }
}
