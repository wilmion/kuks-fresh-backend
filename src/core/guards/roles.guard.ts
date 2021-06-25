import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLE_KEY } from '@core/decorators/roles.decorator';

import { RoleI } from '@core/models/role.model';

import { RoleE } from '@core/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: RoleE[] = this.reflector.get(ROLE_KEY, context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as RoleI;

    const isValid = roles.some((value) => value === user.role);

    if (!isValid) throw new NotFoundException();

    return true;
  }
}
