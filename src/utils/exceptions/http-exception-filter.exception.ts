import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let data: any;

    switch (true) {
      case exception instanceof EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        data = {
          message:
            'The data are you looking for not available. Please try again.',
        };
        break;

      default:
        status =
          exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        data =
          exception instanceof HttpException
            ? exception.getResponse()
            : { message: 'Sorry, something went wrong there. Try again.' };
        break;
    }

    response.status(status).json({
      statusCode: status,
      ...data,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
