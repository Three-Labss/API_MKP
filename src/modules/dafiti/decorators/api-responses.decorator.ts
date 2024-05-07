import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RESPONSES } from '../constants';

export function ApiResponses() {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: RESPONSES.SUCCESS,
      links: {},
      isArray: true,
    }),
    ApiResponse({
      status: 201,
      description: RESPONSES.CREATED,
      links: {},
    }),
    ApiResponse({
      status: 400,
      description: RESPONSES.BAD_REQUEST,
      links: {},
    }),
    ApiResponse({
      status: 401,
      description: RESPONSES.UNAUTHORIZED,
      links: {},
    }),
    ApiResponse({
      status: 404,
      description: RESPONSES.NOT_FOUND,
      links: {},
    }),
    ApiResponse({
      status: 408,
      description: RESPONSES.LIMIT,
      links: {},
    }),
    ApiResponse({
      status: 500,
      description: RESPONSES.SERVICE_UNAVAILABLE,
      links: {},
    }),
  );
}
