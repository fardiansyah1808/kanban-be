import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  RequestTimeoutException,
} from '@nestjs/common';
import { error } from 'console';

import {
  timeout,
  Observable,
  catchError,
  throwError,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(10000),
      catchError((error) => this.handleError(context, error)),
    );
  }

  private handleError(context: ExecutionContext, error: Error) {
    return throwError(() => {
      if (error instanceof TimeoutError) {
        const httpContext = context.switchToHttp();
        const statusCode = httpContext.getResponse().statusCode;
        return new RequestTimeoutException({
          message: error.message,
          error: error.name,
          statusCode,
        });
      }
      return error;
    });
  }
}
