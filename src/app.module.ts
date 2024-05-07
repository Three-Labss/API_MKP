import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './configs/auth/auth.module';
import { PrismaModule } from './configs/db/prisma.module';
import { ClientModule } from './modules/client/client.module';
import { DafitiModule } from './modules/dafiti/dafiti.module';
import { HttpsModule } from './modules/http/https.module';
import { OrderEntryModule } from './modules/orderEntry/orderEntry.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      serveRoot: '/app',
      rootPath: join(__dirname, '..', 'app'),
    }),
    HttpsModule,
    AuthModule,
    PrismaModule,
    OrderEntryModule,
    ClientModule,
    DafitiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
