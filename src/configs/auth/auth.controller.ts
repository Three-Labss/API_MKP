import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // // This is the endpoint that the client will use to sign in.  It will return a JWT token that the client can use to authenticate with the server.
  // @Post('client/sign-in')
  // clientSignIn(@Body() body: Client): Promise<JwtResponse> {
  //   return this.authService.ClientSignIn(body);
  // }

  // // This is the endpoint that the admin will use to sign in.  It will return a JWT token that the admin can use to authenticate with the server.
  // @Post('admin/sign-in')
  // adminSignIn(@Body() body: Admin): Promise<JwtResponse> {
  //   return this.authService.AdminSignIn(body);
  // }

  // // This is the endpoint that the admin will use to Create a new user.  It will return a email and password that the admin can use to authenticate with the server.
  // @UseGuards(JwtAdminGuard)
  // @Post('admin/create/client')
  // adminCreateUser(@Body() body: Client): Promise<Client> {
  //   return this.authService.adminCreateUser(body);
  // }

  // // This is the endpoint that the admin will use to get all the clients.  It will return a list of all the clients.
  // @UseGuards(JwtAdminGuard)
  // @Get('admin/clients')
  // adminGetClients(): Promise<Client[]> {
  //   return this.authService.adminGetClients();
  // }
}
