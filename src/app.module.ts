import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

const { NODE_ENV } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(process.cwd(), 'env', `.${NODE_ENV || 'dev'}.env`),
        join(process.cwd(), 'env', '.env'),
      ],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
