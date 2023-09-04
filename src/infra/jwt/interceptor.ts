import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from '../jwt/constants';

@Injectable()
export class JwtInterceptor extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessToken = (
      (context as any).args?.[0]?.headers?.authorization as string
    )?.replace('Bearer ', '');
    const request = context.switchToHttp().getRequest();

    if (accessToken === undefined) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: jwtConstants.secret,
      });
      request.user = {
        user_id: payload.user_id,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    return (context as any).args?.[0];
  }
}
