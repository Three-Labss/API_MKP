import { Controller, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { JwtClientGuard } from 'src/configs/auth/guards/client.guard';
import { ClientService } from './client.service';

@ApiTags('Auth')
@UseGuards(JwtClientGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
}
