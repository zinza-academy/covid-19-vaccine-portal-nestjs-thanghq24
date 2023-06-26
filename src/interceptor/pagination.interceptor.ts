import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class PaginationInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    const page = request.query.page;
    const pageSize = request.query.pageSize;

    return next.handle().pipe(
      map((data) => ({
        data: data[0],
        page: page,
        pageSize: pageSize,
        count: data[1],
      })),
    );
  }
}
