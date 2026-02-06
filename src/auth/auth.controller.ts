import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: Record<string, string>): Promise<any> {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: Record<string, string>,
  ): Promise<{ access_token: string }> {
    return this.authService.login({
      email: body.email,
      password: body.password,
    });
  }
}
