import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ADMIN_KEY } from '@/utils/constants';

@Injectable()
class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const admin = this.reflector.get<boolean>(ADMIN_KEY, context.getHandler());

    if (!admin) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }

    return true;
  }
}

export default AdminGuard;
