import { BadRequestException, Injectable } from '@nestjs/common';
import { CHANNELS, orderEntry } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/configs/db/prisma.service';

@Injectable()
export class OrderEntryService {
  private presentMonth: number;
  private presentYear: number;
  constructor(private readonly prismaService: PrismaService) {
    this.presentMonth = new Date().getMonth();
    this.presentYear = new Date().getFullYear();
  }

  async getOrderEntryById(
    clientID: string,
    channel: string,
  ): Promise<orderEntry> {
    const orderEntry = await this.prismaService.orderEntry.findFirst({
      where: {
        clientId: clientID,
        channel: channel as CHANNELS,
        month: this.presentMonth,
        year: this.presentYear,
      },
    });
    if (!orderEntry) return await this.createOrderEntry(clientID, channel);
    return await this.updateOrderEntry(orderEntry.id);
  }

  async createOrderEntry(
    clientID: string,
    channel: string,
  ): Promise<orderEntry> {
    const orderEntry = await this.prismaService.orderEntry.create({
      data: {
        id: randomUUID(),
        clientId: clientID,
        ordersCount: 1,
        channel: channel as CHANNELS,
        month: this.presentMonth,
        year: this.presentYear,
        createdAt: new Date(),
      },
    });

    if (!orderEntry)
      new BadRequestException({
        message: 'No se pudo crear el Order Entry.',
        status: 405,
      });
    return orderEntry;
  }

  async updateOrderEntry(id: string): Promise<orderEntry> {
    const orderEntry = await this.prismaService.orderEntry.update({
      where: { id },
      data: {
        ordersCount: {
          increment: 1,
        },
      },
    });

    if (!orderEntry)
      new BadRequestException({
        message: 'No se pudo actualizar el Order Entry.',
        status: 405,
      });
    return orderEntry;
  }
}
