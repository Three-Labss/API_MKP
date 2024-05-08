import { Global, Module } from '@nestjs/common';
import { OrderEntryService } from './orderEntry.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [OrderEntryService],
  exports: [OrderEntryService],
})
export class OrderEntryModule {}
