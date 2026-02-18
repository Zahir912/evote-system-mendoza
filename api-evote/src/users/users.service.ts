import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema'; // Ahora con 'c'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: any) {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }
}
