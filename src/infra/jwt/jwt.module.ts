import { Module } from '@nestjs/common';
import { JwtModule as JwtNestJs } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Jwt } from './jwt.service';

@Module({
  imports: [
    JwtNestJs.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '36000s' },
    }),
  ],
  providers: [Jwt],
  exports: [Jwt],
})
export class JwtModule {}
