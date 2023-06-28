import { BaseAuthGuard } from './base-auth.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES } from '../decorator/allowed-roles.decorator';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entities/user.entity';

@Injectable()
export class RolesGuard extends BaseAuthGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  canActivate(context: ExecutionContext) {
    const allowedRoles = this.reflector.get<ROLES[]>(
      'ALLOWED_ROLES',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) return super.canActivate(context);
    if (!allowedRoles) return super.canActivate(context);

    const hasRole = allowedRoles.some((allowedRole) =>
      user.roles.some((userRole) => {
        return userRole.id === allowedRole;
      }),
    );

    if (hasRole) return true;

    return super.canActivate(context);
  }
}
