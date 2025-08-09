import { Controller, Post, Body, UseGuards, Get,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,private usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    const token = await this.authService.signup(dto);
    return { access_token: token };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.authService.login(dto);
    return { access_token: token };
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req){
  //   return req.user
  // }
  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // On récupère l'utilisateur complet via son id
    const user = await this.usersService.findById(req.user.userId);

    // Évite de renvoyer le mot de passe
    if (user) {
      const { password, ...safeUser } = user;
      return safeUser;
    }

    return null;
  }
}
