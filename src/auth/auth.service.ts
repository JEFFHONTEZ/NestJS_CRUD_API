import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userData: Partial<User>): Promise<User> {
    return (await this.usersService.create(
      userData as User,
    )) as unknown as User;
  }

  async login(userData: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = (await this.usersService.findByEmail(
      userData.email,
    )) as unknown as User;

    if (user && (await bcrypt.compare(userData.password, user.password))) {
      const payload = { email: user.email, sub: user._id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
