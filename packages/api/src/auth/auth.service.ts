import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(mail: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(mail);
    if (user && user.hashedPassword === password) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
