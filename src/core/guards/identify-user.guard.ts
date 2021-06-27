import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ALSO_ADMIN_KEY } from '@core/decorators/alsoAdmin.decorator';

import { RoleE } from '@core/enums/role.enum';

import { RoleI } from '@core/models/role.model';
import { ROLE_KEY } from '@core/decorators/roles.decorator';

@Injectable()
export class IdentifyUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: RoleE[] = this.reflector.get(ROLE_KEY, context.getHandler());
    const isAlsoAdmin = this.reflector.get(
      ALSO_ADMIN_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user as RoleI;

    if (isAlsoAdmin) {
      const isAdmin = user.role === RoleE.ADMIN;

      if (isAdmin) {
        return true;
      }
    }

    if (roles) {
      let isSuperAdminRole: boolean;
      for (const role of roles) {
        isSuperAdminRole = role === RoleE.SUPERADMIN;
      }

      if (isSuperAdminRole && user.role === RoleE.SUPERADMIN) {
        return true;
      }
    }
    const isUser = request.params.id === user.id;

    if (!isUser) throw new NotFoundException();

    return true;
  }
}
