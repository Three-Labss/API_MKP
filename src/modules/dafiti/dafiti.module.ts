import { Module } from '@nestjs/common';
import { ClientModule } from '../client/client.module';
import { DafitiController } from './dafiti.controller';
import { DafitiService } from './dafiti.service';
import { DafitiProductsController } from './orders/dafiti-orders.controller';
import { DafitiProductsService } from './orders/dafiti-orders.service';

@Module({
  imports: [ClientModule],
  controllers: [DafitiController, DafitiProductsController],
  providers: [DafitiService, DafitiProductsService],
})
export class DafitiModule {}
