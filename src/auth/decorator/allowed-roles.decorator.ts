import { SetMetadata } from '@nestjs/common';

export enum Roles {
  Admin = 2,
  User = 3,
}

export const AllowedRoles = (...roles: Roles[]) =>
  SetMetadata('AllowedRoles', roles);
