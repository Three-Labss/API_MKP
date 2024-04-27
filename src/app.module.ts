import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './configs/auth/auth.module';
import { PrismaModule } from './configs/db/prisma.module';
import { ClientModule } from './modules/client/client.module';
import { DafitiModule } from './modules/dafiti/dafiti.module';
import { HttpsModule } from './modules/http/https.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    HttpsModule,
    AuthModule,
    ClientModule,
    DafitiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
