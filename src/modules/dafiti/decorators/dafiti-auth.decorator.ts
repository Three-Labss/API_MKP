import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { DAFITI, RESPONSES } from '../constants';

export const DafitiAuth = createParamDecorator(async (_, __) => {
  let data = new FormData();
  data.append('grant_type', 'client_credentials');

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${DAFITI.URL}/oauth/client-credentials`,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${DAFITI.CLIENT_ID}:${DAFITI.CLIENT_SECRET}`,
      ).toString('base64')}`,
    },
    data: data,
  };

  return await axios
    .request(config)
    .then((response) => {
      const { access_token } = response.data;
      return access_token;
    })
    .catch((error) => {
      throw new UnauthorizedException({
        message: RESPONSES.UNAUTHORIZED,
        error: error.message,
        screen: 'DafitiAuth',
      });
    });
});
