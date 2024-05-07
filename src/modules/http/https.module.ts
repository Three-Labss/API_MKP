import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HttpsController } from './https.controller';
import { HttpsService } from './https.service';

@Global()
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
