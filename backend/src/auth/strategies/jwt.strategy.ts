// // src/auth/jwt.strategy.ts
// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { UsersService } from "src/users/users.service";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private usersService: UsersService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'VOTRE_SECRET_TRES_COMPLIQUE_ET_LONG',
//     });
//   }

//   async validate(payload: any) {
//     const user = await this.usersService.findByEmail(payload.email);
//     if (!user) {
//       throw new UnauthorizedException("Utilisateur non trouvé ou token invalide");
//     }

//     return user;
//   }
// }
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'VOTRE_SECRET_TRES_COMPLIQUE_ET_LONG', // change avec ton vrai secret
    });
  }

  async validate(payload: any) {
    // Ici on transforme sub en userId
    return { userId: payload.sub, email: payload.email };
  }
}
