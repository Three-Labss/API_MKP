import { Module } from '@nestjs/common';
import { ClientModule } from '../client/client.module';
import { DafitiController } from './dafiti.controller';
import { DafitiService } from './dafiti.service';
import { DafitiProductsController } from './products/dafiti-products.controller';
import { DafitiProductsService } from './products/dafiti-products.service';

@Module({
  imports: [ClientModule],
  controllers: [DafitiController, DafitiProductsController],
  providers: [DafitiService, DafitiProductsService],
})
export class DafitiModule {}
