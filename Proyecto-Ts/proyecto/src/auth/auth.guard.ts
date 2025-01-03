import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    let authorization: string | undefined;

    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      authorization = request.headers['authorization'];
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = context.getArgByIndex(2);
      authorization = ctx.req.headers['authorization'];
    }

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado o inválido');
    }

    return true;
  }
}
