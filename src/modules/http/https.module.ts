import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpsController } from './https.controller';
import { HttpsService } from './https.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [HttpsController],
  providers: [HttpsService],
  exports: [HttpsService],
})
export class HttpsModule {}
