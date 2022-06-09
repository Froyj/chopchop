import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { RolesGuard } from 'src/auth/role.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
