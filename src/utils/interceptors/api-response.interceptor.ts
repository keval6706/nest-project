import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message?: string;
  data: T;
}

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: { data: any | null; message: string | null }) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data?.message,
        data: data?.data,
      })),
    );
  }
}
