import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(mail: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(mail);
    if (user && user.hashedPassword === password) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }
}
