import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserLogged } from '../user-logged/user-logged.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'senha super secreta',
    });
  }

  async validate(payload: Partial<UserLogged>) {
    const jwtPayload: Partial<UserLogged> = {
      user_id: payload.user_id,
    };
    return jwtPayload;
  }
}
