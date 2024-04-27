import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayloadInterface } from 'src/configs/auth/interfaces/jwtPayload.interface';
import { PrismaService } from 'src/configs/db/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async validateClient(payload: JwtPayloadInterface) {
    const user = await this.prisma.client.findFirst({
      where: {
        id: payload.id,
        companyEmail: payload.companyEmail,
      },
    });

    if (!user)
      new NotFoundException(
        'Error en la autenticación, si el error persiste contacte al administrador del sistema',
      );

    return user;
  }
}
