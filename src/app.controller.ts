import { Controller, Get, Version } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @Version('1')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth()
  @Version('3.0.0')
  @Get()
  getHello2(): string {
    return 'Hello World! 2';
  }

  @ApiBearerAuth()
  @Version('2')
  @Get()
  getHello3(): string {
    return 'Hello World! 3';
  }
}
