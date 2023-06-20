import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUserFromJwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
