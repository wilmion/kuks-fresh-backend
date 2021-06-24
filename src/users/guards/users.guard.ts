import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { comprobate } from '@core/utils/JWT';

import { PermisionsI } from '@core/entity/permisions.entity';

@Injectable()
export class UsersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token: string = request.headers.authorization.replace('Bearer ', '');

    return this.verifyPermisions(token);
  }

  async verifyPermisions(token: string) {
    const permisions: PermisionsI = <any>await comprobate(token, 'secret');

    console.log(permisions);
    return true;
  }
}
