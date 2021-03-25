import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonSubscriber } from './subscribers/common.subscriber';
import { UserSubscriber } from './subscribers/user.subscriber';
import { UserEntity } from './entities/user.entity';

const repositories = TypeOrmModule.forFeature([UserEntity]);

const subscribers = [UserSubscriber, CommonSubscriber];
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          migrationsTableName: 'migrations',
          migrationsRun: false,
          synchronize: false,
          logging: configService.get<string>('POSTGRES_LOGGING') === 'true',
          subscribers,
          autoLoadEntities: true,
          timezone: configService.get('TZ'),
        };
      },
      inject: [ConfigService],
    }),
    repositories,
  ],
  exports: [repositories],
})
export class DataBaseModule {}
