import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientModule } from 'src/modules/client/client.module';
import { PrismaModule } from '../db/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtClientStrategy } from './strategies/client.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
    PrismaModule,
    ClientModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtClientStrategy],
  exports: [JwtClientStrategy, PassportModule, JwtModule],
})
export class AuthModule {}
