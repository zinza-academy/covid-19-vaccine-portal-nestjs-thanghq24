import { SetMetadata } from '@nestjs/common';

export enum ROLES {
  ADMIN = 2,
  USER = 3,
}
export const ALLOWED_ROLES = 'ALLOWED_ROLES';
export const AllowedRoles = (...roles: ROLES[]) =>
  SetMetadata(ALLOWED_ROLES, roles);
