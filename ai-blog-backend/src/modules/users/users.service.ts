import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    return user.save();
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user || !user.password) throw new NotFoundException("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("Invalid credentials");

    return user;
  }

  async findAll() {
    return this.userModel.find().exec();
  }
}
