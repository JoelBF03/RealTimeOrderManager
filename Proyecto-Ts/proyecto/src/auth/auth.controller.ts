import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('get-token')
  getToken(@Headers('authorization') authorization: string) {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado o invalido');
    }
    return { token: authorization };
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return await this.authService.login(email, password);
  }

  @Post('register')
  async register(
    @Body('first_name') first_name: string,
    @Body('last_name') last_name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('password') password: string
  ) {
    return await this.authService.register(first_name, last_name, email, phone, address, password);
  }
}
