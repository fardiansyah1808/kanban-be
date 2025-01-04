import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

type Response<T> = {
  data: T;
  message: string;
  statusCode: number;
};

type ErrorResponse = {
  message: string | string[];
  error: string;
  statusCode: number;
  details?: any;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(this.handleSuccess(context)),
      catchError((error) => this.handleError(error)),
    );
  }

  private handleSuccess(context: ExecutionContext): (data: T) => Response<T> {
    return (data: T) => {
      const httpContext = context.switchToHttp();
      const statusCode = httpContext.getResponse().statusCode;
      let message = 'Success';

      if (statusCode === 201) {
        message = 'Created';
      }

      return {
        data,
        message,
        statusCode,
      };
    };
  }

  private handleError(error: Error) {
    return throwError(() => {
      let response: ErrorResponse = {
        message: 'Internal Server Error',
        error: 'Internal Server Error',
        statusCode: 500,
      };

      if (error instanceof HttpException) {
        response.statusCode = error.getStatus();
        const errorResponse = error.getResponse();
        if (typeof errorResponse === 'string') {
          response.message = errorResponse;
          response.error = errorResponse;
        } else if (
          typeof errorResponse === 'object' &&
          errorResponse !== null
        ) {
          const { message, error: errorMsg } = errorResponse as {
            message: string | string[];
            error: string;
          };
          if (message) {
            response.message = message;
          }
          if (errorMsg) {
            response.error = errorMsg;
          }
        }
      } else {
        this.logger.error('Unexpected error:', error);
      }

      return new HttpException(response, response.statusCode);
    });
  }
}
