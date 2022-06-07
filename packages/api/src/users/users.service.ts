import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private readonly logger = new Logger(UsersService.name);

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel({
        lastname: createUserDto.lastname,
        firstname: createUserDto.firstname,
        address: createUserDto.address,
        telephone: createUserDto.telephone,
        mail: createUserDto.mail,
        hashedPassword: createUserDto.hashedPassword,
      });
      return await createdUser.save();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error retrieving users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const users = await this.userModel.findById(id).exec();
      return users;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error retrieving users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userModel
        .updateOne({ _id: id }, updateUserDto)
        .exec();
      if (!result?.acknowledged) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error updating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.userModel.deleteOne({ _id: id }).exec();
      return `Removed user with id ${id}`;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error deleting user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
