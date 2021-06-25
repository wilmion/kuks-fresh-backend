import { RoleE } from '@core/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
export const Role = (...roles: RoleE[]) => SetMetadata(ROLE_KEY, roles);
