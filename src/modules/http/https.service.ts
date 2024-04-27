import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class HttpsService {
  constructor(private readonly httpService: HttpService) {}

  async getHttps(httpBody: HttpBodyTypes) {
    const config = {
      maxBodyLength: Infinity,
      headers: {
        accept: 'application/json',
        'X-Context': 'seller',
        Authorization: `Bearer ${httpBody.token}`,
      },
      data: httpBody.data || null,
    };

    return await this.httpService.axiosRef
      .get(httpBody.url, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }
}
