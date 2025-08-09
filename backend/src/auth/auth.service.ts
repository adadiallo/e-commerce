// import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
// import { SignupDto } from './dto/signup.dto';
// import { LoginDto } from './dto/login.dto';

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UsersService, 
//     private jwtService: JwtService) {}

//   async signup(dto: SignupDto) {
//     const existing = await this.usersService.findByEmail(dto.email);
//     if (existing) throw new ConflictException('Email déjà utilisé');

//     const hashedPassword = await bcrypt.hash(dto.password, 10);
//     const user = await this.usersService.create({ ...dto, password: hashedPassword });

//     return this.jwtService.sign({ sub: user.id, email: user.email });
//   }

//   async login(loginDto: LoginDto) {
//     const {email,password} = loginDto;
//     const user = await this.usersService.findByEmail(email);
//     if (!user){
//       throw new UnauthorizedException('Identifiants invalides.')
//     }
//     const passwordFourni = await bcrypt.compare(password,user.password)
// if(!passwordFourni){
//   throw new UnauthorizedException('Identifiants invalides.')
// }
// const payload = {email:user.email, sub:user.id};
// const accessToken = this.jwtService.sign(payload);
// return {
//   access_token:accessToken,
// };
// }

// }
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email déjà utilisé');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    // On met sub dans le token
    return this.jwtService.sign({ sub: user.id, email: user.email });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const payload = { sub: user.id, email: user.email,role:user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
