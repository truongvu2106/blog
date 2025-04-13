import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post("register")
  async register(@Body() body: { name: string; email: string; password: string }) {
    return this.authService.register(body.name, body.email, body.password);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("protected")
  getProtectedData() {
    return { message: "You have access!" };
  }
}
