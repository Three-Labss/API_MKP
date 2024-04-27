import { Module } from '@nestjs/common';
import { ClientModule } from '../client/client.module';
import { HttpsModule } from '../http/https.module';
import { DafitiController } from './dafiti.controller';
import { DafitiService } from './dafiti.service';

@Module({
  imports: [ClientModule, HttpsModule],
  controllers: [DafitiController],
  providers: [DafitiService],
})
export class DafitiModule {}
