// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { MongoClient } from "mongodb";
// import * as bcrypt from "bcryptjs";

// @Injectable()
// export class AuthService {
//   private client = new MongoClient(process.env.MONGODB_URI!);
//   private users = this.client.db().collection("users");

//   constructor(private jwtService: JwtService) {}

//   async validateUser(email: string, password: string) {
//     const user = await this.users.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new UnauthorizedException("Invalid email or password");
//     }
//     return user;
//   }

//   async login(email: string, password: string) {
//     const user = await this.validateUser(email, password);
//     const payload = { id: user._id, email: user.email };
//     return {
//       access_token: this.jwtService.sign(payload),
//       user,
//     };
//   }

//   async register(name: string, email: string, password: string) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = { name, email, password: hashedPassword };
//     const result = await this.users.insertOne(newUser);
//     return { id: result.insertedId, name, email };
//   }
// }

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    const payload = { id: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) throw new UnauthorizedException("Email already registered");

    return this.usersService.createUser(name, email, password);
  }
}
