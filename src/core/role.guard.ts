import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwtDecode from 'jwt-decode';

const matchRoles = (roles: string[], userRole: string): boolean => {
  let found = false;
  roles.find((r) => {
    if (r === userRole) found = true;
  });
  return found;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.replace('Bearer ', '');
      // const decoded: any = jwtDecode(token);
      // if (token && decoded.role) {
      //   request.userId = decoded._id;
      //   return matchRoles(roles, decoded.role)
      // }
      if (token) {
        return true;
      }
      else return false;
    } else return false;
  }
}
