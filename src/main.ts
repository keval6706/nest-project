import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './utils/exceptions/http-exception-filter.exception';

import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm/out';
import { getRepository } from 'typeorm';
import { SessionEntity } from './database/entities/session.entity';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = +app.get(ConfigService).get('PORT') || 4000;

  // helemt use
  app.use(helmet());

  // enable cors
  app.enableCors();

  // Set Session
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 86400,
      }).connect(getRepository(SessionEntity)),
      secret: app.get(ConfigService).get('SESSION_SECRET'),
    }),
  );

  // Error Handler
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () => {
    console.log(`################################################
  🛡️  Server listening on port: ${port} 🛡️
################################################`);
  });
}
bootstrap();
