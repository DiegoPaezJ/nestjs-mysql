import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


import { Role } from '../../common/enums/rol.enum';

import { ROLES_KEY } from '../decorators/roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role  = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!role ) {
      return true;
    }
    const { usuario } = context.switchToHttp().getRequest();

    if(usuario.role === Role.SUPERADMIN){
      return true;
    }

    if(usuario.role === Role.ADMIN){
      return true;
    }
    return role === usuario.role;

    // return requiredRoles.some((role) => usuario.roles?.includes(role));
  }
  
}
