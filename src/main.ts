import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './utils/exceptions/http-exception-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = +app.get(ConfigService).get('PORT') || 4000;

  // helemt use
  app.use(helmet());

  // enable cors
  app.enableCors();

  // Error Handler
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () => {
    console.log(`################################################
  🛡️  Server listening on port: ${port} 🛡️
################################################`);
  });
}
bootstrap();
